<template>
    <Page class="page">
        <ActionBar title="imagepicker + background-http" class="action-bar"></ActionBar>

        <GridLayout rows="*, auto">
            <GridLayout v-if="!showWelcome" rows="auto auto auto, *">
                <Progress :value="event && event.eventData ? event.eventData.currentBytes : 0"
                    :maxValue="event && event.eventData ? event.eventData.totalBytes : 0">
                </Progress>

                <Label row="1" v-if="event && event.eventData && event.eventData.currentBytes !== NaN"
                    class="m-10 text" :text="'Transferred: ' + event.eventData.currentBytes / 1000 + ' KB'"></Label>

                <Label row="2" class="m-10 text" text="Events"></Label>

                <ListView row="3" for="item in eventLog">
                    <v-template>
                        <StackLayout class="t-12">
                            <Label :text="item.eventTitle" textWrap="true"></Label>
                            <Label v-if="item.eventData && item.eventData.error"
                                :text="item.eventData ? 'Error: ' + item.eventData.error : ''"
                                textWrap="true"></Label>
                            <Label v-if="item.eventData && item.eventData.body"
                                :text="item.eventData ? 'Body: ' + item.eventData.body : ''"
                                textWrap="true"></Label>
                            <Label v-if="item.eventData && item.eventData.raw"
                                :text="item.eventData ? 'Raw: ' + item.eventData.raw : ''"
                                textWrap="true"></Label>
                        </StackLayout>
                    </v-template>
                </ListView>
            </GridLayout>
            <StackLayout v-if="showWelcome" verticalAlignment="middle">
                <Label class="m-10 nativescript-label text" text="{N}"></Label>
                <Label class="m-10 text" v-if="showWelcome" text="This sample app shows how to pick an image with"
                    textWrap="true"></Label>
                <Label class="m-10 text plugin" text="nativescript-imagepicker"></Label>
                <Label class="m-10 text" v-if="showWelcome" text="and upload it using"
                    textWrap="true"></Label>
                <Label class="m-10 text plugin" text="nativescript-background-http"></Label>
                
                <Label class="m-10 text" v-if="showWelcome" text="This sample app shows how to pick an image with"
                    textWrap="true"></Label>
                <Label class="m-10 text" v-if="showWelcome" text="This sample app shows how to pick an image with"
                    textWrap="true"></Label>
            </StackLayout>
            <Button class="m-b-10 m-t-10 t-20" row="1" text="Choose image to upload" @tap="onSelectImageTap($event)"></Button>
        </GridLayout>
    </Page>
</template>

<script>
    import VueRx from "../vue-rx";
    import Vue from "nativescript-vue";

    const app = require("tns-core-modules/application");
    const platform = require("platform");
    const fs = require("file-system");
    const imagePicker = require("nativescript-imagepicker");
    const rxjs = require("rxjs");
    const operators = require("rxjs/operators");
    const bgHttp = require("nativescript-background-http");

    Vue.use(VueRx);
    // Vue.config.silent = false; // uncomment for debugging purposes

    export default {
        data() {
            return {
                showWelcome: true,
                session: bgHttp.session("image-upload"),
                currentFileNameBeingUploaded: ""
            };
        },
        subscriptions() {
            this.event$ = new rxjs.BehaviorSubject({});
            return {
                event: this.event$,
                eventLog: this.event$.pipe(
                    operators.sampleTime(200),
                    operators.concatMap(value => rxjs.of(value)),
                    operators.scan((acc, logEntry) => {
                        acc.push(logEntry);
                        return acc;
                    }, []),
                    // emit only logs for the this.currentFileNameBeingUploaded
                    operators.map(allLogs => allLogs.filter(logEntry => !!logEntry && logEntry.eventTitle && logEntry.eventTitle.indexOf(this.currentFileNameBeingUploaded) > 0))
                )
            };
        },
        methods: {
            onSelectImageTap() {
                let context = imagePicker.create({
                    mode: "single"
                });
                this.startSelection(context);
            },
            generateKeypair() {
                (async () => {
                    const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
                        userIds: [{ name: 'Jon Smith', email: 'jon@example.com' }], // you can pass multiple user IDs
                        curve: 'ed25519',                                           // ECC curve name
                        passphrase: 'super long and hard to guess secret'           // protects the private key
                    });

                    console.log(privateKeyArmored);     // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
                    console.log(publicKeyArmored);      // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
                    console.log(revocationCertificate); // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
                })();
            },
            startSelection(context) {
                context
                    .authorize()
                    .then(() => {
                        return context.present();
                    })
                    .then(selection => {
                        this.showWelcome = false;

                        let imageAsset = selection.length > 0 ? selection[
                            0] : null;
                        if (imageAsset) {
                            this.getImageFilePath(imageAsset).then(path => {
                                console.log(`path: ${path}`);
                                this.uploadImage(path);
                            });
                        }
                    })
                    .catch(function(e) {
                        console.log(e);
                    });
            },
            uploadImage(path) {
                let file = fs.File.fromPath(path);
                this.currentFileNameBeingUploaded = file.path.substr(
                    file.path.lastIndexOf("/") + 1
                );
                let request = this.createNewRequest();
                request.description = "uploading image " + file.path;
                request.headers["File-Name"] = this.currentFileNameBeingUploaded;

                // -----> multipart upload
                // var params = [{
                //         name: "test",
                //         value: "value"
                //     },
                //     {
                //         name: "fileToUpload",
                //         filename: file.path,
                //         mimeType: "image/jpeg"
                //     }
                // ];
                // var task = this.session.multipartUpload(params, request);
                // <----- multipart upload

                let task = this.session.uploadFile(file.path, request);
                task.on("progress", this.onEvent.bind(this));
                task.on("error", this.onEvent.bind(this));
                task.on("responded", this.onEvent.bind(this));
                task.on("complete", this.onEvent.bind(this));
            },
            createNewRequest() {
                let url;
                // NOTE: using https://httpbin.org/post for testing purposes,
                // you'll need to use your own service in real-world app
                if (platform.isIOS) {
                    url = "https://httpbin.org/post";
                } else {
                    url = "http://www.csm-testcenter.org/test";
                }

                let request = {
                    url: url,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream"
                    },
                    description: "uploading file...",
                    androidAutoDeleteAfterUpload: false,
                    androidNotificationTitle: "NativeScript HTTP background"
                };
                return request;
            },
            getImageFilePath(imageAsset) {
                return new Promise(resolve => {
                    if (platform.isIOS) {
                        const options = PHImageRequestOptions.new();
                        options.synchronous = true;
                        options.version =
                            PHImageRequestOptionsVersion.Current;
                        options.deliveryMode =
                            PHImageRequestOptionsDeliveryMode.HighQualityFormat;

                        PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(
                            imageAsset.ios,
                            options,
                            nsData => {
                                // create file from image asset and return its path
                                const tempFolderPath = fs.knownFolders
                                    .temp()
                                    .getFolder("nsimagepicker").path;
                                const tempFilePath = fs.path.join(
                                    tempFolderPath,
                                    Date.now() + ".jpg"
                                );

                                nsData.writeToFileAtomically(
                                    tempFilePath, true);
                                resolve(tempFilePath);
                            }
                        );
                    } else {
                        // return imageAsset.android, since it 's the path of the file
                        resolve(imageAsset.android);
                    }
                });
            },
            onEvent(e) {
                let eventEntry = {
                    eventTitle: e.eventName + " " + e.object.description,
                    eventData: {
                        error: e.error ? e.error.toString() : e.error,
                        currentBytes: e.currentBytes,
                        totalBytes: e.totalBytes,
                        body: e.data
                        // raw: JSON.stringify(e) // uncomment for debugging purposes
                    }
                };

                this.event$.next(eventEntry);
            }
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }

    .text {
        text-align:
            center;
        font-size: 18px;
    }

    .plugin {
        font-weight: 600;
        font-size: 23px;
    }

    .nativescript-label {
        font-size: 60px;
        background-color: #3d5afe;
        font-weight: 600;
        color: white;
        border-radius: 20px/20px;
        width: 230px;
        height: 230px;
    }
</style>
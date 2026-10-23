<template>
    <b-modal ref="my-modal" :title="modal_title" @hidden="$emit('modalClose')" no-fade static>
        <div slot="modal-footer" class="d-flex justify-content-end">
            <b-button variant="outline-secondary" class="mr-2" @click="hideModal">{{ __('cancel') }}</b-button>
            <b-button variant="primary" @click="$refs['dummy_submit'].click()" :disabled="isLoading">
                {{ __('save') }} <b-spinner v-if="isLoading" small label="Spinning"></b-spinner>
            </b-button>
        </div>
        <form ref="my-form" @submit.prevent="saveRecord">
            <div class="row">
                <div class="form-group col-md-6">
                    <label for="social_media_name">{{ __('name') }}</label>
                    <i class="text-danger">*</i>
                    <input type="text" name="name" id="social_media_name" v-model="socialMedia.name"
                        :placeholder="__('e_g_instagram') || 'e.g. Instagram'" class="form-control" required>
                </div>
                <div class="form-group col-md-6">
                    <label for="link">{{ __('link') }}</label>
                    <input type="url" name="link" id="link" v-model="socialMedia.link" :placeholder="__('link')" class="form-control" required>
                </div>
                <div class="form-group col-12">
                    <label class="d-block">{{ __('icon') }} <i class="text-danger" v-if="!socialMedia.id">*</i></label>
                    <input type="file" id="social_media_icon" ref="file_image" class="d-none" accept="image/*"
                        @change="handleFileUpload">

                    <label for="social_media_icon" class="file-input-div bg-gray-100 d-block" @drop="dropFile" @dragover.prevent
                        @dragenter.prevent>
                        <template v-if="image && image.name">
                            {{ __('selected_file_name') }}: {{ image.name }}
                        </template>
                        <template v-else>
                            <i class="fa fa-cloud-upload-alt fa-2x"></i><br>
                            {{ __('drop_files_here_or_click_to_upload') }}
                        </template>
                    </label>

                    <div v-if="error" class="text-danger mt-1">{{ error }}</div>

                    <div v-if="image_url" class="row mt-2 mx-0">
                        <img :src="image_url" class="custom-image social-icon-preview" />
                    </div>
                </div>
            </div>
            <button ref="dummy_submit" class="d-none"></button>
        </form>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ['record'],
    data : function(){
        return {
            isLoading: false,
            socialMedia:{
                id: this.record ? this.record.id : null ,
                name: this.record ? this.record.name : "" ,
                link: this.record ? this.record.link : "" ,
            },
            image: null,
            image_url: this.record ? this.record.icon : "",
            error: null,
        };
    },
    computed: {
        modal_title: function(){
            let title = this.socialMedia.id ? __('edit') : __('add') ;
            return title + ' ' + __('social_media');
        },
    },
    methods: {
        showModal() {
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },

        dropFile(event) {
            event.preventDefault();
            this.$refs.file_image.files = event.dataTransfer.files;
            this.setImageFile(event.dataTransfer.files[0]);
        },
        handleFileUpload(e) {
            this.setImageFile(e.target.files[0]);
        },
        setImageFile(file) {
            if (!file) return;

            this.error = null;

            const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg+xml"];
            if (!validTypes.includes(file.type)) {
                this.error = __('invalid_image_type');
                return;
            }

            if (file.size > 2 * 1024 * 1024) {
                this.error = __('image_must_be_less_than_2mb');
                return;
            }

            this.image = file;
            this.image_url = URL.createObjectURL(file);
        },
        saveRecord: function(){
            let vm = this;

            if (!this.socialMedia.id && !this.image) {
                this.error = __('please_select_an_icon_image') || 'Please select an icon image';
                return;
            }

            this.isLoading = true;
            let formObject = this.socialMedia;
            let formData = new FormData();
            for(let key in formObject){
                formData.append(key, formObject[key]);
            }
            if (this.image) {
                formData.append('image', this.image);
            }
            let url = this.$apiUrl + '/social_media/save';
            if(this.socialMedia.id){
                url = this.$apiUrl + '/social_media/update';
            }
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {
                    this.$eventBus.$emit('socialMediaSaved', data.message);
                    this.hideModal();
                }else{
                    vm.showError(data.message);
                    vm.isLoading = false;
                }
            }).catch(error => {
                vm.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                }else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError("Something went wrong!");
                }
            });
        }
    },
    mounted(){
        this.showModal();
    }
}
</script>

<style scoped>
.social-icon-preview {
    width: 48px;
    height: 48px;
    object-fit: contain;
    padding: 4px;
    border: 1px solid var(--ui-border);
    border-radius: var(--ui-radius);
    background: var(--ui-surface);
}
</style>

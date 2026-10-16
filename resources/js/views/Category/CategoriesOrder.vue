<template>
    <div>
        <div class="page-heading">
            <div class="page-title mb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h3 class="modern-page-title mb-0">{{ __('categories_order') }}</h3>
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><router-link to="/dashboard" class="text-muted">{{ __('dashboard') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active text-primary" aria-current="page">{{ __('categories_order') }}</li>
                        </ol>
                    </nav>
                </div>
            </div>

            <section class="section">
                <div class="figma-main-section-card mb-4">
                    <div class="card-body p-4">
                        <h4 class="card-title mb-4">{{ __('main_categories_order_list') }}</h4>
                        <b-row class="mb-4">
                            <b-col md="12">
                                <div class="form-check form-switch mb-0">
                                    <input type="checkbox" v-model="editable" class="form-check-input" id="enableDragDrop">
                                    <label class="form-check-label ms-1" for="enableDragDrop">
                                        {{ __('enable_drag_and_drop') }}
                                    </label>
                                </div>
                            </b-col>
                        </b-row>
                            <b-row>
                                <b-col md="12" style="overflow-y:scroll; overflow-x:auto; height:600px;">

                                    <ul id="sortable-row" class="list-group">
                                        <draggable class="list-group" tag="ul" v-model="list" v-bind="dragOptions"
                                            :move="onMove" animation="200" @start="isDragging = true"
                                            @end="isDragging = false" @change="updateCategoriesOrder()">
                                            <li v-for="category in list" :key="category.row_order"
                                                class="list-group-item d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <span class="text-muted d-inline-block" style="min-width: 90px; margin-right: 14px;">
                                                        <span class="d-inline-block text-right" style="width: 25px;">{{ category.row_order }}</span>
                                                        <span class="mx-2">-</span>
                                                        <span class="d-inline-block text-left" style="width: 25px;">{{ category.id }}</span>
                                                    </span>
                                                    <img :src="category.image_url" class="rounded" style="height: 40px; width: 40px; object-fit: cover; margin-right: 14px;" />
                                                    <span class="font-weight-normal">{{ getCategoryName(category) }}</span>
                                                    <span v-if="category.all_parents" class="d-flex align-items-center ml-4 all_parents">
                                                        <span class="d-flex align-items-center ml-3"
                                                            v-for="(parent, index) in getParentsList(category.all_parents)"
                                                            :key="index">
                                                            <i class="fas fa-angle-left mr-2 text-muted"></i>
                                                            <img :src="parent.image_url" class="rounded mr-2" style="height: 25px; width: 25px; object-fit: cover;"
                                                                :title="parent.id + '-' + getCategoryName(parent)">
                                                        </span>
                                                    </span>
                                                </div>
                                                <span><i class="fas fa-arrows-alt"></i></span>
                                            </li>
                                        </draggable>
                                    </ul>
                                </b-col>
                            </b-row>
                        </div>
                    </div>
                </section>
            </div>
        </div>
</template>
<script>
import draggable from 'vuedraggable';
import axios from "axios";
export default {
    components: {
        draggable,
    },
    data: function () {
        return {
            categories: [],
            list: [],
            editable: true,
            isDragging: false,
            onDragEnd: false,
            delayedDragging: false,
            isLoading: false,
            currentLanguageId: null,
            activeLanguages: [],
        }
    },
    computed: {
        dragOptions() {
            return {
                animation: 0,
                group: "description",
                disabled: !this.editable,
                ghostClass: "ghost"
            };
        },
    },
    watch: {
        isDragging(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        },
    },
    mounted() {

    },
    created: function () {
        // Refresh list when category is saved elsewhere; no toast (parent shows it)
        this.$eventBus.$on('categorySaved', () => {
            this.getCategories();
        });
        this.fetchActiveLanguages().then(() => {
            this.getCategories();
        });
    },
    methods: {
        onDragEnd(newValue) {
            if (newValue) {
                this.delayedDragging = true;
                return;
            }
            this.$nextTick(() => {
                this.delayedDragging = false;
            });
        },
        fetchActiveLanguages() {
            return axios.get(this.$apiUrl + '/active_languages')
                .then(response => {
                    if (response.data.data && Array.isArray(response.data.data)) {
                        this.activeLanguages = response.data.data;
                        const appLocale = window.appLocale || 'en';
                        const currentLanguage = this.activeLanguages.find(
                            lang => lang.code === appLocale
                        );
                        if (currentLanguage) {
                            this.currentLanguageId = currentLanguage.id;
                        } else {
                            const defaultLanguage = this.activeLanguages.find(
                                lang => lang.is_default === 1
                            );
                            if (defaultLanguage) {
                                this.currentLanguageId = defaultLanguage.id;
                            }
                        }
                    }
                })
                .catch(error => {
                    console.error('Error loading languages:', error);
                });
        },
        getCategoryName(category) {
            if (!category) return '';
            if (this.currentLanguageId && category.translations && Array.isArray(category.translations)) {
                const translation = category.translations.find(
                    t => t.language_id === this.currentLanguageId
                );
                if (translation && translation.name && translation.name.trim() !== '') {
                    return translation.name;
                }
            }
            return category.name || '';
        },
        getParentsList(parent) {
            let parents = [];
            while (parent) {
                parents.push(parent);
                parent = parent.all_parents;
            }
            return parents; // To show the hierarchy from top to bottom
        },
        orderList() {
            this.getCategories();
        },
        onMove({ relatedContext, draggedContext }) {
            const relatedElement = relatedContext.element;
            const draggedElement = draggedContext.element;
            return (
                (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
            );
        },
        updateList() {
            this.list.map((category, index) => {
                category.row_order = index + 1;
            });
        },
        getCategories() {
            axios.get(this.$apiUrl + '/categories/row_order')
                .then((response) => {
                    let data = response.data;
                    this.list = data.data.map((category, index) => {
                        return {
                            id: category.id,
                            name: category.name,
                            row_order: category.row_order,
                            image_url: category.image_url,
                            all_parents: category.all_parents,
                            translations: category.translations,
                            fixed: false
                        };
                    })
                });
        },
        updateCategoriesOrder() {
            this.updateList();

            this.isLoading = true;
            let formData = this.list;
            let url = this.$apiUrl + '/categories/updateOrder';
            axios.post(url, formData).then(res => {
                let data = res.data;
                if (data.status === 1) {

                    this.showMessage("success", data.message);
                    this.isLoading = false;
                    this.getCategories();
                } else {
                    this.showError(data.message);
                    this.isLoading = false;
                }
            }).catch(error => {
                this.isLoading = false;
                if (error.request.statusText) {
                    this.showError(error.request.statusText);
                } else if (error.message) {
                    this.showError(error.message);
                } else {
                    this.showError(__('something_went_wrong'));
                }
            });

        },
    }
};
</script>
<style scoped>
.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
    margin-bottom: 8px;
    border-radius: 8px !important;
    transition: background-color 0.2s ease;
}

.list-group-item i {
    cursor: pointer;
}
</style>

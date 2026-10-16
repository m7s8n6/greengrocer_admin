<template>
    <div>
        <div>
            <div class="page-heading">
                <div class="row">
                    <div class="col-12 col-md-6 order-md-1 order-last">
                        <h3>{{ __('frequently_asked_questions') }}</h3>
                    </div>
                    <div class="col-12 col-md-6 order-md-2 order-first">
                        <nav aria-label="breadcrumb" class="breadcrumb-header float-start float-lg-end">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><router-link to="/dashboard">{{ __('dashboard')
                                        }}</router-link></li>
                                <li class="breadcrumb-item active" aria-current="page">{{
                                    __('frequently_asked_questions') }}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="figma-main-section-card">
                    <div class="card-body p-0">
                        <div
                            class="d-flex justify-content-between align-items-center flex-wrap gap-2 figma-action-bar-row">
                            <div class="flex-grow-1">
                                <div class="figma-search-container">
                                    <i class="fa fa-search text-muted"></i>
                                    <input v-model="filter" type="search" class="figma-search-input"
                                        :placeholder="__('search')">
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-figma-columns d-flex align-items-center gap-2"
                                    @click="create_new = true" v-if="$can('faq_create')">
                                    <i class="fa fa-plus"></i>
                                    <span>{{ __('add') }}</span>
                                </button>
                                <button class="btn btn-figma-filter d-flex align-items-center gap-2" @click="getFaqs()"
                                    v-b-tooltip.hover :title="__('refresh')">
                                    <i class="fa fa-refresh"></i>
                                    <span>{{ __('refresh') }}</span>
                                </button>
                            </div>
                        </div>

                        <div class="table-responsive mb-0">
                            <b-table :items="translatedFaqs" :fields="fields" :current-page="currentPage"
                                :per-page="perPage" :filter="filter" :filter-included-fields="filterOn"
                                :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection"
                                :bordered="false" :busy="isLoading" stacked="md" show-empty small
                                :tbody-tr-class="() => 'figma-tr align-middle'" class="figma-table">
                                <template #head()="data">
                                    <span class="figma-th">{{ data.label }}</span>
                                </template>
                                <template #table-busy>
                                    <div class="text-center text-black my-2">
                                        <b-spinner class="align-middle"></b-spinner>
                                        <strong>{{ __('loading') }}...</strong>
                                    </div>
                                </template>
                                <template #cell(faqs)="row">
                                    <a href="javascript:void(0)" style="color:#435ebe;">{{ row.item.question }}</a>
                                    <div class="faq-answer">
                                        <p class="mb-0"
                                            v-if="!shouldTruncate(row.item.answer) || expandedFaqs[row.item.id]">
                                            {{ row.item.answer }}
                                        </p>
                                        <p class="mb-0" v-else>
                                            {{ getTruncatedText(row.item.answer) }}
                                        </p>
                                        <!-- View More/Less Link -->
                                        <a v-if="shouldTruncate(row.item.answer)"
                                            @click="toggleFaqExpansion(row.item.id)" href="javascript:void(0)"
                                            style="color: #007bff; font-size: 12px; cursor: pointer;">
                                            {{ expandedFaqs[row.item.id] ? __('view_less') : __('view_more') }}
                                        </a>
                                    </div>
                                </template>
                                <template #cell(actions)="row">
                                    <div class="d-flex gap-2">
                                        <button class="figma-action-btn" @click="edit_record = row.item"
                                            v-b-tooltip.hover :title="__('edit')" v-if="$can('faq_update')">
                                            <base-icon name="edit icon" hoverName="edit Hover" width="24" height="24" />
                                        </button>
                                        <button class="figma-action-btn figma-delete-btn"
                                            @click="deleteSocialMedia(row.index, row.item.id)" v-b-tooltip.hover
                                            :title="__('delete')" v-if="$can('faq_delete')">
                                            <base-icon name="Type=Default" hoverName="Type=Hover" width="24"
                                                height="24" />
                                        </button>
                                    </div>
                                </template>
                            </b-table>
                        </div>
                        <div class="figma-table-footer">
                            <div class="showing-results-text">
                                {{ __('Showing Result') }} : <span class="showing-bold">{{ pageEnd }}</span> {{ __('of')
                                }} <span class="showing-bold">{{ totalRows }}</span>
                            </div>
                            <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage"
                                align="right" class="figma-pagination mb-0" hide-goto-end-buttons hide-ellipsis
                                prev-text="<" next-text=">"></b-pagination>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- Add / Edit -->
        <app-edit-record v-if="create_new || edit_record" :record="edit_record"
            @modalClose="hideModal()"></app-edit-record>
    </div>
</template>
<script>
import EditRecord from './Edit';
import axios from "axios";

export default {
    components: {
        'app-edit-record': EditRecord,
    },
    data: function () {
        return {
            fields: [
                { key: 'faqs', label: __('frequently_asked_questions'), sortable: true },
                { key: 'actions', label: __('actions') }
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: this.$perPage,
            pageOptions: this.$pageOptions,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            page: 1,

            isLoading: false,
            sectionStyle: 'style_1',
            max_visible_units: 12,
            max_col_in_single_row: 3,
            create_new: null,
            edit_record: null,
            faqs: [],
            expandedFaqs: {}, // Track which FAQs are expanded
            maxLength: 200, // Maximum characters to show before truncation
            currentLanguageId: null,
            activeLanguages: [],

        }
    },
    computed: {
        translatedFaqs() {
            const list = Array.isArray(this.faqs) ? this.faqs : [];

            if (!this.currentLanguageId || list.length === 0) {
                return list;
            }

            return list.map(faq => {
                const translatedFaq = { ...faq };

                if (faq.translations && Array.isArray(faq.translations)) {
                    const translation = faq.translations.find(
                        t => t.language_id === this.currentLanguageId
                    );

                    if (translation) {
                        if (translation.question && translation.question.trim() !== '') {
                            translatedFaq.question = translation.question;
                        }

                        if (translation.answer && translation.answer.trim() !== '') {
                            translatedFaq.answer = translation.answer;
                        }
                    }
                }

                return translatedFaq;
            });
        }
        ,
        sortOptions() {
            // Create an options list from our fields
            return this.fields
                .filter(f => f.sortable)
                .map(f => {
                    return { text: f.label, value: f.key }
                })
        },
        pageEnd() {
            return Math.min(this.currentPage * this.perPage, this.totalRows);
        }
    },
    mounted() {
        // Set the initial number of items
        this.totalRows = this.faqs.length
    },
    created() {
        this.$eventBus.$on('faqSaved', (message) => {
            this.showMessage("success", message);
            this.getFaqs();
            this.create_new = null;
        });

        this.fetchActiveLanguages().then(() => {
            this.getFaqs();
        });
    },
    methods: {
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
        getFaqs() {
            this.isLoading = true;

            const params = {
                offset: this.currentPage,
                limit: this.perPage,
                filter: this.filter
            };

            axios.get(this.$apiUrl + '/faqs', { params })
                .then(response => {
                    const data = response.data || {};
                    this.faqs = Array.isArray(data.data) ? data.data : [];
                    this.totalRows = typeof data.total === 'number' ? data.total : 0;
                    this.isLoading = false;
                })
                .catch(() => {
                    this.faqs = [];
                    this.totalRows = 0;
                    this.isLoading = false;
                });
        },

        deleteSocialMedia(index, id) {
            this.$swal.fire({
                title: __('are_you_sure'),
                text: __('you_want_be_able_to_revert_this'),
                confirmButtonText: __('yes_sure'),
                cancelButtonText: __('cancel'),
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#37a279',
                cancelButtonColor: '#d33',
            }).then(result => {

                if (result.value) {
                    this.isLoading = true
                    let postData = {
                        id: id
                    }
                    axios.post(this.$apiUrl + '/faqs/delete', postData)
                        .then((response) => {
                            this.isLoading = false
                            this.faqs.splice(index, 1)
                            //this.showSuccess(response.data.message)
                            this.showMessage("success", response.data.message);
                        });
                }
            });
        },
        hideModal() {
            this.create_new = false
            this.edit_record = false
        },
        // Toggle FAQ expansion state
        toggleFaqExpansion(faqId) {
            this.$set(this.expandedFaqs, faqId, !this.expandedFaqs[faqId]);
        },
        // Check if FAQ answer should be truncated
        shouldTruncate(answer) {
            return answer && answer.length > this.maxLength;
        },
        // Get truncated text for display
        getTruncatedText(answer) {
            if (!answer) return '';
            return answer.length > this.maxLength ? answer.substring(0, this.maxLength) + '...' : answer;
        },
    }
};
</script>

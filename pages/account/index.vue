<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <ul id="myTab" class="nav nav-tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button
                                id="general-settings-tab"
                                class="nav-link active"
                                data-bs-toggle="tab"
                                data-bs-target="#general-settings"
                                type="button"
                                role="tab"
                                aria-controls="general-settings"
                                aria-selected="true"
                                @click="currentTab != 'general-settings' ? (currentTab = 'general-settings') : ''"
                            >
                                {{ $t('generalSettings') }}
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                id="social-links-tab"
                                class="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#social-links"
                                type="button"
                                role="tab"
                                aria-controls="social-links"
                                aria-selected="false"
                                @click="currentTab != 'social-links' ? (currentTab = 'social-links') : ''"
                            >
                                {{ $t('socialLinks') }}
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                id="contact-settings-tab"
                                class="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#contact-settings"
                                type="button"
                                role="tab"
                                aria-controls="contact-settings"
                                aria-selected="false"
                                @click="currentTab != 'contact-settings' ? (currentTab = 'contact-settings') : ''"
                            >
                                {{ $t('contactSettings') }}
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                id="privacy-settings-tab"
                                class="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#privacy-settings"
                                type="button"
                                role="tab"
                                aria-controls="privacy-settings"
                                aria-selected="false"
                                @click="currentTab != 'privacy-settings' ? (currentTab = 'privacy-settings') : ''"
                            >
                                {{ $t('privacySettings') }}
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                id="content-tab"
                                class="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#content"
                                type="button"
                                role="tab"
                                aria-controls="content"
                                aria-selected="false"
                                @click="currentTab != 'content' ? (currentTab = 'content') : ''"
                            >
                                {{ $t('content') }}
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                id="form-settings-tab"
                                class="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#form-settings"
                                type="button"
                                role="tab"
                                aria-controls="form-settings"
                                aria-selected="false"
                                @click="currentTab != 'form-settings' ? (currentTab = 'form-settings') : ''"
                            >
                                {{ $t('formSettings') }}
                            </button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button
                                id="email-settings-tab"
                                class="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#email-settings"
                                type="button"
                                role="tab"
                                aria-controls="email-settings"
                                aria-selected="false"
                                @click="currentTab != 'email-settings' ? (currentTab = 'email-settings') : ''"
                            >
                                {{ $t('emailSettings') }}
                            </button>
                        </li>
                    </ul>
                    <div id="myTabContent" class="tab-content">
                        <div
                            id="general-settings"
                            class="tab-pane fade show active"
                            role="tabpanel"
                            aria-labelledby="general-settings-tab"
                        >
                            <GeneralSettingsForm v-if="currentTab === 'general-settings'" />
                        </div>
                        <div id="social-links" class="tab-pane fade" role="tabpanel" aria-labelledby="social-links-tab">
                            <LazySocialLinksForm v-if="currentTab === 'social-links'" />
                        </div>
                        <div
                            id="contact-settings"
                            class="tab-pane fade"
                            role="tabpanel"
                            aria-labelledby="contact-settings-tab"
                        >
                            <LazyContactSettingsForm v-if="currentTab === 'contact-settings'" />
                        </div>
                        <div
                            id="privacy-settings"
                            class="tab-pane fade"
                            role="tabpanel"
                            aria-labelledby="privacy-settings-tab"
                        >
                            <LazyPrivacySettingsForm v-if="currentTab === 'privacy-settings'" />
                        </div>
                        <div id="content" class="tab-pane fade" role="tabpanel" aria-labelledby="content-tab">
                            <LazyContentForm v-if="currentTab === 'content'" />
                        </div>
                        <div
                            id="form-settings"
                            class="tab-pane fade"
                            role="tabpanel"
                            aria-labelledby="form-settings-tab"
                        >
                            <LazyFormSettings v-if="currentTab === 'form-settings'" />
                        </div>
                        <div
                            id="email-settings"
                            class="tab-pane fade"
                            role="tabpanel"
                            aria-labelledby="email-settings-tab"
                        >
                            <LazyEmailSettingsForm v-if="currentTab === 'email-settings'" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const currentTab = ref('general-settings');
</script>

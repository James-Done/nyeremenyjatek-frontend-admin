<template>
    <div>
        <div class="container-fluid mb-4">
            <div class="row">
                <div class="col-12">
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
                        <div class="container-fluid">
                            <NuxtLink class="navbar-brand" to="/">{{ $t('home') }}</NuxtLink>
                            <button
                                class="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarNav"
                                aria-controls="navbarNav"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div id="navbarNav" class="collapse navbar-collapse">
                                <ul class="navbar-nav">
                                    <li class="nav-item">
                                        <NuxtLink to="/users" class="nav-link">{{ $t('users') }}</NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="/prizes" class="nav-link">{{ $t('prizes') }}</NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="/campaign" class="nav-link">{{ $t('campaigns') }}</NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="/accounts" class="nav-link">{{ $t('accounts') }}</NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="/entries" class="nav-link">{{ $t('entries') }}</NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="/winners" class="nav-link">{{ $t('winners') }}</NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="/account" class="nav-link">{{ $t('account') }}</NuxtLink>
                                    </li>
                                    <li class="nav-item">
                                        <NuxtLink to="/account/edit" class="nav-link">{{
                                            $t('accountSettings')
                                        }}</NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

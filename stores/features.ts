export const useFeatureStore = defineStore('features', {
    state: () => ({
        entries: {
            filter: false,
            export: true,
        },
        winners: {
            filter: false,
        },
        campaigns: {
            delete: false,
            edit: false,
            prizes: false,
        },
        prizes: {
            active: false,
        },
        users: {
            active: false,
        },
        account: {
            active: false,
            deactivate: false,
            edit: false,
            add: false,
        },
        accountSettings: {
            active: false,
        },
    }),
});

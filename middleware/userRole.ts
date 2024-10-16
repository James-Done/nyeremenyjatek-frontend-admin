export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path !== '/') {
        return;
    }

    interface MyCustomUser {
        id: number;
        first_name: string;
        last_name: string;
        phone: string;
        birthday: string;
        address_zipcode: string;
        address_city: string;
        address_street: string;
        address_street_type: string;
        address_number: string;
        address_floor: string;
        email: string;
        email_verified_at: string;
        type: string;
        created_at: string;
        updated_at: string;
        validation_token: string;
    }

    const user = useSanctumUser<MyCustomUser>();

    // @ts-ignore
    if (!user.value || user.value.type !== 'superadmin') {
        return navigateTo('/');
    }
});

export const handleFormErrors = (error: any, setErrors: (errors: any) => void, message: ({}) => void) => {
    if (error?.response && error?.response?._data) {
        const responseData = error.response._data;

        if (responseData.errors) {
            setErrors(responseData.errors);
        }
    }

    message({
        title: 'error',
        message: error?.response?._data?.message,
        type: 'error',
        show: true,
    });
};

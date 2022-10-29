export const getErrorMessage = (err) => {
    return err?.data?.error || err?.data || err?.response?.data?.error || err?.response?.data;
}
import httpInstance from "@/utils/axiosInit";

export const paymentAPI = (orderId, prime, details, name, phone_number, email) => {
    return httpInstance({
        url: `pay/${orderId}`,
        method: 'POST',
        data: {
            prime,
            details,
            cardholder: {
                name,
                phone_number,
                email
            }
        }
    });
}
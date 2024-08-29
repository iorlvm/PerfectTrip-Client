import httpInstance from "@/utils/axiosInit";

export const paymentAPI = (orderId, prime, details, name, phoneNumber, email) => {
    return httpInstance({
        url: `pay/${orderId}`,
        method: 'POST',
        data: {
            prime,
            details,
            cardholder: {
                name,
                phoneNumber,
                email
            }
        }
    });
}
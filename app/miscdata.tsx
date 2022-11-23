export const Heading = "Big Burgerz"

export const ReserveForm = [
    [
        {
            type: "date",
            label: "Select a reservation date",
            id: "date",
            placeholder: "",
        }
    ],
    [
        {
            type: "text",
            label: "Name*",
            id: "name",
            placeholder: "John Doe",
        },
        {
            type: "text",
            label: "Phone Number  (Auto filled)",
            id: "phone",
            takeValue: true,
        },
        {
            type: "text",
            label: "Email  (Auto filled)",
            id: "email",
            takeValue: true,
        },
    ],
    [
        {
            type: "number",
            label: "Seats",
            id: "seats",
            placeholder: "1",
            min: 1,
        },
    ],
];

export type ReserveFormType = {
    type: string,
    label?: string | undefined,
    id: string,
    placeholder?: string | undefined,
    min: number | undefined
}
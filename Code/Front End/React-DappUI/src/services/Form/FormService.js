export default class FormService {
    getForm(id) {
        return {
            id: 1,
            title: 'New Contact',
            fields: [
                {
                    id: 'firstName',
                    ordinal: 1,
                    name: 'firstName',
                    label: 'First Name',
                    type: 1 // ShortText
                },
                {
                    id: 'lastName',
                    ordinal: 2,
                    name: 'lastName',
                    label: 'Last Name',
                    type: 1 // ShortText
                },
                {
                    id: 'birthday',
                    ordinal: 3,
                    name: 'birthday',
                    label: 'Birthday',
                    type: 1 // DateTime
                }
            ]
        };
    }
}
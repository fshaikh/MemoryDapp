export default async function getMenu() {
    return await [
        {
            "id": "1",
            "title": "New Submission",
            "icon": "",
            "order": 1,
            "route": "/submission/new"
        },
        {
            "id": "2",
            "title": "View Submission",
            "icon": "",
            "order": 2,
            "route": "/submission/view"
        },
        {
            "id": "3",
            "title": "Latest Submissions",
            "icon": "",
            "order": 3,
            "route": "/submission/latest"
        },
        {
            "id": "4",
            "title": "New Meta Form",
            "icon": "",
            "order": 4,
            "route": "/form/new"
        }
        
    ];
}
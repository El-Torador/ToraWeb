export  const END_POINT = "/learnship/api/v1.0.0";
export const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        "content-type": "application/json"
    }
}

export const API_KEY_USERS='LEARNSHIP2020R2767687678686877BVHJDVBHHSUSER'

export const API_KEY_INSTANCE = 'LEARNSHIP2020R27676877Y68YFSDVSBDVSDVBVHJDVBINSTANCE'

export const API_KEY_LEARNER = 'LEARNSHIXSXS7676877Y68Y56757T8V8GISD77DMHJDVBLEARNER'
export const instance = [
    {
        id: 1,
        name: 'IAI-CENTRE',
        city: 'Yaoundé',
        address: 'Nkolanga\'a',
        responsable: 'Armand Claude Abanda',
        phone_number: ["696045982", "675668902"],
        created_at: Date.now()
    },
    {
        id: 2,
        name: 'IAI-OUEST',
        city: 'Bafoussam',
        address: 'Carrefour le Maire',
        responsable: 'Ymele Serge Guy',
        phone_number: ["695046972"],
        created_at: Date.now()
    },
    {
        id: 3,
        name: 'IAI-NORD',
        city: 'Kolofata',
        address: 'Ntabah',
        responsable: 'Shawn George',
        phone_number: ["678904456", "655678788", "667666564"],
        created_at: Date.now()
    },
    {
        id: 4,
        name: 'IAI-EST',
        city: 'Boutombo',
        address: 'Diacha',
        responsable: 'John Fotso',
        phone_number: ["678903422"],
        created_at: Date.now()
    },
    {
        id: 5,
        name: 'IAI-SUD',
        city: 'Sanmelyma',
        address: 'Goatche',
        responsable: 'Vice Kimber',
        phone_number: ["667321544", "655442877"],
        created_at: Date.now()
    }
]
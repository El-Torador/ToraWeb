import { Model } from 'react-axiom'
import moment from 'moment'

class Statistic extends Model {

    static defaultState(){
        return  {
            id: 1,
            description: 'Bonjour le monde',
            date: moment(Date.now()).fromNow()
        }
    }
}

/*
class Formation extends Model {
    static defaultState() {
        return {
            id: Number,
            name: String,
            type: String
        }
    }
}
class Module extends Model{
    static defaultState(){
        return {
            id: Number,
            name: String,
            description: String,
            id_formation: Number
        }
    }
}

*/


export default Statistic

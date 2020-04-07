import { getDiscipline, getDisciplineById } from './CRUD_discipline'

describe('Test all the endpoint of discipline on controller discipline', ()=>{
    it('should return all disciplines', async ()=>{
        const disciplines = await getDiscipline()
        expect(disciplines.data).toMatchSnapshot() 
        
    })
    it('should return discipline by id', async ()=>{
        const disciplines = await getDiscipline()
        const id=[], discipline = []
        await disciplines.map(item=> id.push(item.id))
        await id.forEach(async (value) => {
            let res = await getDisciplineById(Number(value))
            discipline.push(res.data)
        })
        discipline.forEach(item=> expect(item).toMatchSnapshot())  
    })
    
})
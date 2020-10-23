function createData(name: string, calories: number, fat: number, carbs: number, protein: number, lol: number) {
    return { name, calories, fat, carbs, protein, lol };
}
    
const rows = [
    createData('Frozen yoghurt',     159, 6.0,  24, 4.0, 12),
    createData('Ice cream sandwich', 237, 9.0,  37, 4.3, 12),
    createData('Eclair',             262, 16.0, 24, 6.0, 123),
    createData('Cupcake',            305, 3.7,  67, 4.3, 123),
    createData('Gingerbread',        356, 16.0, 49, 3.9, 123123),
    createData('Ecladir',            262, 16.0, 24, 6.0, 123),
    createData('Cupcafke',           305, 3.7,  67, 4.3, 123),
    createData('Gingesrbread',       356, 16.0, 49, 3.9, 123123),
];

const columns = [
    { name: 'name',      type: 'string' },
    { name: 'calories',  type: 'number' },
    { name: 'fat',       type: 'number' },
    { name: 'carbs',     type: 'number' },
    { name: 'protein',   type: 'number' },
    { name: 'lol',       type: 'number' },
];

export {columns, rows};
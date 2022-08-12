export default function html([first,...string],...values){
    return values.reduce(
        // (acc, curr)=> [...acc,curr,string.shift()] //dùng như này thì tạo ra 2 mảng lồng nhau 
        // như này [ '\n    <ui>\n',[ '<li>BMW</li>', '<li>VinFast</li>', '<li>Huyndai</li>' ],'\n    </ui>' ]
        //nên khi join lại thì cái mảng values ở giữa nó vẫn còn phẩy
        //do đó cần nối mảng lại trước khi join bằng concat
        (acc, curr)=> acc.concat(curr,string.shift())
        ,[first])
        .filter(x => x && x !== true || x === 0) //giữ lại cái true lọc đi cái false// và giữ những cái khác true hoặc cái bằng 0
        .join('')
        
}
export function createStore (reducer) {
    let state = reducer();
    //objec Map cho phép đặt key bằng nhiều kiểu dữ liệu
    const roots = new Map(); 

           //? roots { element: fnc => card}
    function render() {
       for (const [root, component] of roots) {
           const output = component() // '<h1>hello ok</h1>'
           root.innerHTML = output
       }
    }
//? attach( fnc => card , element )
//? createStore(init{cars})
    return {
       attach(component, root) {
           roots.set(root, component)
           render()
       },
       connect(selector = state => state) {
           return component => (props, ...args) => 
               component(Object.assign({}, props, selector(state), ...args))
            //component = App(state = { cars: ..})

       },
       dispatch(action, ...args ) {
           state = reducer(state, action, args)
           render()
       }
    }
}


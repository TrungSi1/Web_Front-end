const coures = [
    {   
        id: '1',
        name: 'Tìm hiểu về ngành IT',
        content_c: 'Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn đã có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan các công ty IT và tìm hiểu về văn hóa, tác phong làm việc của ngành này nhé các bạn.',
        image_i: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    },
    {   
        id: '1',
        name: 'ok hiểu',
        content_c: 'Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn đã có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan các công ty IT và tìm hiểu về văn hóa, tác phong làm việc của ngành này nhé các bạn.',
        image_i: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
    },
  
]

const CouresCom = ({ coure, onClick }) => {
            return (
                <div>
                    <h2 onClick ={() => onClick(coure)}>{coure.name}</h2>
                    <p>{coure.content_c}</p>
                    <img src={coure.image_i} />
                </div>
            )
}

const Form = {
    Input() {
        return <input></input>
    },
    Checkbox() {
        return <input type='checkbox'></input>
    },
}

// component cho buttun có thẻ nhận onclick và href để chuyển trang
function Button ({p, href, className, onClick}) {
   let Component = 'button'
   const props = {}

   if(href){
        Component = 'a'
        props.href = href
    }
   if(onClick){
        props.onClick =() => onClick(p)
    }
   return (
        <Component className ={className} {...props}>click me</Component>
    )

}

function App() {

    const handleClick = (coure) => 
        console.log(coure.name)
    const type = 'Input'
    const Component = Form[type]

    return (
        <div id = 'wapper'>
            {
                coures.map((coure) => {
                    return (
                    <CouresCom
                        key = {coure.id} 
                       coure ={coure}
                       onClick ={handleClick}
                    />
                ) })

            }
            <Component/>
            <Button
            className = 'hreftButton'
            href = 'https://www.w3schools.com/jsref/jsref_map.asp'
            onClick = { (p) => console.log(p)}
            p='ok'
            />
        </div>
    )
}
ReactDOM.render(<App/>, document.querySelector('#root'))
import { Link } from "react-router-dom"


const Page404 = () => {
  return (
    <div style={{
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'space-evenly',
        alignItems : 'center',
        width : '100vw',
        height : '28vh'
    }}>
        <h1>404 Error</h1>
        <h2>Page not found</h2>  
        <Link to={'/home'} style={{
          padding : '8px 15px',
          backgroundColor : '#242424',
          color : '#fff',
          textDecoration : 'none',
          borderRadius : '8px'
        }}>Go back</Link>
    </div>
  )
}

export default Page404
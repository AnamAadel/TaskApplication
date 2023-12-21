import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='container mx-auto flex justify-center items-center flex-col'>
        <img src="https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1" alt="" className='max-w-xl' />
        <Link to='/' className='btn btn-primary mt-4'>Go Home</Link>
    </div>
  )
}

export default ErrorPage
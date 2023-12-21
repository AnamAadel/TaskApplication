import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='container mx-auto flex justify-center items-center flex-col'>
        <img src="https://st2.depositphotos.com/20710520/46622/i/450/depositphotos_466223776-stock-photo-404-error-page-found-system.jpg" alt="" className='max-w-xl' />
        <Link to='/' className='btn btn-primary mt-4'>Go Home</Link>
    </div>
  )
}

export default ErrorPage
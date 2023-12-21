import PropTypes from 'prop-types';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from 'react-router-dom';

function Card({item}) {
  const [isLike, setIsLike] = useState(false);
 
  return (
    <div  className={`card rounded-none justify-center relative pt-16 text-neutral-focus p-12 bg-slate-200 hover:bg-slate-300 group product_cart`} style={item.span}>
    <figure><img src={item.image} className='h-32 mix-blend-multiply' alt="Shoes" /></figure>
    <div className="card-body pt-3 absolute top-0 left-0 right-0 bottom-0">
      <h2 className="card-title -ml-2">{item.name}</h2>
      <span className='font-bold absolute bottom-3 left-6'>{item.price}</span>
      <button onClick={()=> setIsLike(!isLike)} className='text-3xl absolute bottom-3 right-6 '>{isLike ? <AiFillHeart /> : <AiOutlineHeart />}</button>
      <Link to={`/products/detail/${item._id}`} className='absolute top-3 right-8 transition-all duration-300 text-4xl group-hover:translate-x-2 opacity-0 group-hover:opacity-100' ><HiArrowNarrowRight /></Link>
    </div>
  </div>
  )
}

Card.propTypes = {
  item: PropTypes.object.isRequired
}
export default Card
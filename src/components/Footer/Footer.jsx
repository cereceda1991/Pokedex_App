import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <span className='footer__name'>Made by <b>Max Cereceda</b></span>
      <span className='footer__follow-me'>Follow me
        <a className='footer__icon' target='_blank' href='https://github.com/cereceda1991/Pokedex_App'><i className='bx bxl-github' /></a>
        <a className='footer__icon' target='_blank' href='https://www.linkedin.com/in/maxcereceda/'><i className='bx bxl-linkedin-square' /></a>
      </span>
    </div>
  )
}

export default Footer
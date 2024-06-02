import './index.css'

const SkillCard = props => {
  const {details} = props
  const {imageUrl, name} = details
  return (
    <li className="skill-card">
      <img src={imageUrl} alt={name} className="skill-img" />
      <p> {name} </p>
    </li>
  )
}

export default SkillCard

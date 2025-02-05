/*
this is a direct way to use the props properties in the component, e.g. through the object

function CoreConcept(props) {
  return (<li>
    <img src={props.image} alt={props.title} />
    <h3>{props.title}</h3>
    <p>{props.description}</p>
  </li>);
}
*/

//we can also unpack the properties of the object with the {property_name_1,...,property_name_n} to use them directly

export default function CoreConcept({title, description, image}) {
    return (<li>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </li>);
  }
  
import ImageComponent from '../../components/ImageComponent'

const Hints = ({ activeHints }) => {
  return (
    <div className="hint-container">
      {activeHints.map((hint, i) => (
        <Hint
          key={i}
          hintText={hint.text}
          image={hint.image}
          i={i}
          isLast={activeHints.slice(-1) == hint}
        />
      ))}
    </div>
  );
};

function Hint(props) {
  const { hintText, image, i, isLast } = props;
  return (
    <>
      {isLast ? (
        <details open>
          <summary>{i + 1}. Hint</summary>
          <p>{hintText}</p>
        </details>
      ) : (
        <details>
          <summary>{i + 1}. Hint</summary>
          <p>{hintText}</p>
          {image && <ImageComponent imagePath={image}/>}
        </details>
      )}
    </>
  );
}

export default Hints;

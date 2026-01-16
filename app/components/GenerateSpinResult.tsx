const GenerateSpinResult = () => {
  const slot = [];
 
  const imageIndex = Math.floor(Math.random() * 12) + 1;

  const type: 'noah' | 'dog' = Math.random() < 0.5 ? 'noah' : 'dog';

  const image = type === 'noah'
    ? `/public/noah/noah-${imageIndex}.jpg`
    : `/public/dogs/dog-${imageIndex}.jpg`

  slot.push({ type, imageIndex, image });

  const types = slot.map(slot => slot.type);
  const noahCount = types.filter(t => t === 'noah').length;
  const dogCount = types.filter(t => t === 'dog').length;

return (
    <div>
      <span>hello noah</span>
    </div>
)

}



export default GenerateSpinResult;
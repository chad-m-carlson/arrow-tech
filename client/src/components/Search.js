import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'

const propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  searchActive: PropTypes.bool.isRequired,
  searchOn: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  styles: PropTypes.object
}

const defaultProps = {
  styles: {
      input: {
          background: '#ddd',
          border: 'none',
          borderRadius: '3px',
          padding: '.5rem'
      }
  }
}

const Search = ({data, placeholder, onChange, searchActive, width, searchOn, styles}) => {
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState('');

  useEffect( () => {
    setActive(searchActive)
  },[searchActive])
  
  const handleChange = (e) => {
    setQuery(e.target.value.toLowerCase())
    const filteredData = data.filter( d => {
      return d[searchOn].toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
    });
    if ( e.target.value.length > 0)onChange(filteredData, true)
    else onChange(filteredData, false);
  };

  return ( 
    <div style={{margin: "1rem"}}>
      <input 
        type="text" 
        placeholder={placeholder}
        style={styles.input} 
        onChange={(e) => handleChange(e)} 
        value={active ? query : ''}
        width={width}
      />
    </div>
   );
}

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;
 
export default Search;

// ? This search component is reusable, it will need a return results function to supply filtered results to the parent component. 

// ? it will take in DATA to filter, NAME to set the placeholder, RETURNRESULTS to send filtered data back to parent, SEARCHACTIVE boolean to reset input value and WIDTH to set input width.

// ? in parent component: have a state value for filtered data and a boolean to setsearch active. the return results take in the filtered data, and the active boolean.


// const onChange = (results, active) => {
//   if(active){
//     setFilteredExercises(results)
//     setSearchActive(true)
//   }else setSearchActive(false)
// };
// ? you will need to have two different maps depending on if search is active or not, if search is active, map through the filtered data. If search is not active, map through the original array
// const renderExerciseList = () => {
//   if(searchActive === true){
//     return(
//       filteredExercises.map( e => 
//         <li key={e.id}>
//           <Exercise
//             exercise={e}
//             exerciseChanged={exerciseChanged}
//             setExerciseChanged={setExerciseChanged}
//           />
//         </li>
//       )
//     )
//   }else return(
//     exercises.map( e => 
//       <li key={e.id}>
//         <Exercise
//           exercise={e}
//           exerciseChanged={exerciseChanged}
//           setExerciseChanged={setExerciseChanged}
//         />
//       </li>
//     )
//   )
// };

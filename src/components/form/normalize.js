const normalize = value => {
    if (value.length > 2) {
        console.log(value)
      return value.substring(0, 2)
    }

    return val => val.length < 2 ? "0" + val : val
  }
  
  export default normalize
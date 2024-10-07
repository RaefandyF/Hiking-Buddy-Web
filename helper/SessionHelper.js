
const helperSession = () => {
    let sessid = ''
    if(typeof window != undefined){
      sessid = sessionStorage.getItem('userid')
    }
    return sessid
}

export default helperSession
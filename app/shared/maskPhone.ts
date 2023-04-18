export const maskPhone = (event: any) => { 
  let tel = event.target;
  let selectionStart = event.target.selectionStart;

  let formattedInputValue = '';
  
  const getInputsNumberValue = (input: any) => {
    return input.value.replace(/\D/g, "");
  }

  let phoneNumber = getInputsNumberValue(tel);

  if (!phoneNumber) {
    return formattedInputValue = ''
  }

  if (tel.value.length != selectionStart) {
    if (event.nativeEvent.data && /\D/g.test(event.nativeEvent.data)) {
      event.target.value = phoneNumber.substring(0, 16);
    }
    return;
  }
 

  if (['7', '8', '9'].indexOf(phoneNumber[0]) > -1) {
    if (phoneNumber[0] === '9') {
      formattedInputValue = `+7 ${phoneNumber.substring(0, 16)}`;
    }

    let firstSymbols = phoneNumber[0] === '8' ? '+7' : '+7';

    formattedInputValue = `${firstSymbols} `;

    if (phoneNumber.length > 1) {      
      formattedInputValue += `(${phoneNumber.substring(1, 4)}`
    }

    if (phoneNumber.length >= 5) {
      formattedInputValue += `) ${phoneNumber.substring(4, 7)}`
    }

    if (phoneNumber.length >= 8) {
      formattedInputValue += `-${phoneNumber.substring(7, 9)}`
    }

    if (phoneNumber.length >= 10) {
      formattedInputValue += `-${phoneNumber.substring(9, 11)}`
    }

  } else {
    return formattedInputValue = `+${phoneNumber.substring(0, 16)}`;
  }

  const onPhoneKeyDown = (e: any) => {
    let input = e.target;

    if (e.keyCode == 8 && getInputsNumberValue(input).length == 1) {      
      input.value = '';
    }
  }

  event.target.addEventListener('keydown', onPhoneKeyDown)
  
  return formattedInputValue;
}
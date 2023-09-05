async function stopPlayTransportSwitch(ip = '172.16.45.19', port = 'Ethernet1/0/6',OnOf=true) {
    let flagSuccess = false;
    let notification=""
  
    const connection = new Telnet();
    const params = {
      host: ip,
      port: 23,
      shellPrompt: 'Password:',
      timeout: 2000,
    };
  
    try {
      const prompt = await connection.connect(params);
     
      console.log('Connected to Switch');
  function foundUplinkDownlink(params) {
    if(params.includes('link-type hybrid'))
    {
      return false
    }else {
      return true
    }
  }
    
  let dataConnected = await connection.send('AdmiN12345\r\n');
  console.log(dataConnected);
  
       await connection.send('sys');
      let portInfo=await connection.send(`display current-configuration interface ${port}`)
  
      flag = foundUplinkDownlink(portInfo);
  if (OnOf){
      if (flag) {
       
        await connection.send(`interface ${port}`);
        await connection.send('shutdown');
        flagSuccess = true;
      }else {
        notification="невірний порт "
      }
    }else {
      if (flag) {
       
        await connection.send(`interface ${portInfo}`);
        await connection.send('undo shutdown');
        flagSuccess = true;
      }else {
        notification="невірний порт "
      }
    }
  
    } catch (err) {
      console.error('Error:', err);
    } finally {
      // Розірвати з'єднання навіть у випадку помилки
      await connection.end();
    }
  
    return {flagSuccess,notification};
  }
  
  
  
  
  async function main() {
    const result = await stopPlayTransportOlt();
    console.log('Operation :', result);
  }
  
  main();
  
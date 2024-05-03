figma.showUI(__html__);

figma.ui.onmessage =  (msg: {type: string, file_key: string}) => {

  if (msg.type === 'create-catalog') {
    const file_key = msg.file_key;
    console.log(file_key);
  }

  figma.closePlugin();
};

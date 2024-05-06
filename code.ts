figma.showUI(__html__);

figma.ui.onmessage =  (msg: {type: string, file_key: string}) => {

  if (msg.type === 'create-catalog') {
    // const file_key = msg.file_key;
    const page = figma.currentPage;

    const sectionNodes = page.findAll(node => node.type === 'SECTION');

    sectionNodes.forEach((sectionNode) => {
      // MEMO: findAll で取得すると SceneNode になる。SectionNode ではない。
      // https://www.typescriptlang.org/docs/handbook/advanced-types.html
      // https://forum.figma.com/t/type-scenenode-is-not-assignable-to-type-componentnode/19694/2
      const section = sectionNode as SectionNode;

      // MEMO : 情報をまとめる Frame を作る
      const frame = figma.createFrame();
      frame.layoutMode = "VERTICAL";
      frame.itemSpacing = 20;
      frame.horizontalPadding = 20;
      frame.verticalPadding = 20;
      frame.layoutSizingHorizontal = "HUG";
      frame.name = section.name;

      const colorRound = 0.10196078568696976;
      frame.strokes = [{ type: "SOLID", color: { r: 184/255, g: 28/255, b: 37/255 }}];
      frame.strokeWeight = 10;
      frame.dashPattern = [20, 20];

      // MEMO: テキスト情報を作る => Frame に追加する
      (async () => {
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });
        const textLabel = figma.createText();
        textLabel.characters = section.name;
        textLabel.fontSize = 40;

        // frame.appendChild(textLabel);
        frame.insertChild(0, textLabel);
      })();

      section.children.forEach((child, index) => {
        if(child.type === 'FRAME') {
          const childFrame = child as FrameNode;
          console.log(childFrame.name);

          (async () => {
            const bytes = await childFrame.exportAsync({
              format: 'PNG',
              constraint: { type: 'SCALE', value: 1 },
            })
  
            const image = figma.createImage(bytes);
            const rectangle = figma.createRectangle();

            rectangle.resize(childFrame.width, childFrame.height)
            rectangle.fills = [{
              imageHash: image.hash,
              scaleMode: "FILL",
              scalingFactor: 1,
              type: "IMAGE",
            }]
            // frame.appendChild(rectangle);
            frame.insertChild(index, rectangle);
          })();

        }
      });


    });

    // const sectionNodes = page.findAll(node => node.type === 'SECTION');
    // sectionNodes.forEach((sectionNode) => {
    //   const sectionName = sectionNode.name;
    //   console.log(sectionNode.parent);
    // });
  }

  // figma.closePlugin();
};

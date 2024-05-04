figma.showUI(__html__);

figma.ui.onmessage =  (msg: {type: string, file_key: string}) => {

  if (msg.type === 'create-catalog') {
    // const file_key = msg.file_key;
    const page = figma.currentPage;

    const sectionNodes = page.findAll(node => node.type === 'SECTION');

    // MEMO: findAll で取得すると SceneNode になる。SectionNode ではない。
    // https://www.typescriptlang.org/docs/handbook/advanced-types.html
    // https://forum.figma.com/t/type-scenenode-is-not-assignable-to-type-componentnode/19694/2
    sectionNodes.forEach((sectionNode) => {
      const section = sectionNode as SectionNode;

      section.children.forEach((child) => {
        if(child.type === 'FRAME') {
          const frame = child as FrameNode;
          console.log(frame.name);
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

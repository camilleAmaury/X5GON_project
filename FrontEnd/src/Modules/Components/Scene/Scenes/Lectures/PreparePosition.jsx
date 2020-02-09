export default function PreparePosition(documents, ratio, scene, state) {
    let obj = {};

    // document container
    obj.lecturesDocument = {
        height: []
    };
    for (let i = 0; i < documents.length; i++) {
        obj.lecturesDocument.height.push(documents[i].isScrolled ? scene.height : state.documentContainerBox.height);
    }

    obj.container = {
        document: {
            width: scene.width,
            height: [],
            left: []
        },
        pagoda: {
            width: scene.width,
            height: [],
            left: []
        },
        separator: {
            width: state.documentSeparatorBox.height,
            height: [],
            left: []
        }
    };
    for (let i = 0; i < documents.length; i++) {
        obj.container.document.height.push(obj.lecturesDocument.height[i]);
        obj.container.pagoda.height.push(obj.lecturesDocument.height[i]);
        obj.container.separator.height.push(obj.lecturesDocument.height[i]);
        obj.container.document.left.push(documents[i].isOpened ? - obj.container.document.width - obj.container.separator.width : 0);
        obj.container.pagoda.left.push(documents[i].isOpened ? 0 : obj.container.document.width + obj.container.separator.width);
        obj.container.separator.left.push(documents[i].isOpened ? - obj.container.separator.width : obj.container.document.width);
    }
    obj = preparePositionDocument(obj, documents, ratio, scene, state);
    obj = preparePositionPagoda(obj, documents, ratio, scene, state)
    return obj;
}

function preparePositionDocument(obj, documents, ratio, scene, state){
    if (true) {
        // side scroll
        obj.scrollSide = {
            width: Math.floor(ratio * state.scrollSideBox.width),
            height: Math.floor(ratio * state.scrollSideBox.height)
        };
        let scrollTopWidth = Math.floor(scene.width * 7 / 8);
        obj.scrollSideTop = Math.floor(((state.documentContainerBox.height - state.documentSeparatorBox.height) - obj.scrollSide.height) / 2 - obj.scrollSide.height / 2) - 5;
        obj.scrollSide.left1 = Math.floor((scene.width - scrollTopWidth) / 2);
        obj.scrollSide.left2 = Math.floor((scene.width - scrollTopWidth) / 2) + scrollTopWidth - obj.scrollSide.width;
        obj.scrollSideBottom = [];
        for (let i = 0; i < documents.length; i++) {
            obj.scrollSideBottom.push(documents[i].isScrolled ? (obj.container.document.height[i] - obj.scrollSideTop - obj.scrollSide.height) :
                Math.floor(((state.documentContainerBox.height - state.documentSeparatorBox.height) - obj.scrollSide.height) / 2 + obj.scrollSide.height / 2) + 5);
        }
        // scroll upper part
        obj.upper = {
            width: obj.scrollSide.left2 - (obj.scrollSide.left1 + obj.scrollSide.width),
            height: Math.floor(ratio * state.scrollUpperBox.height)
        };
        obj.upper.left = obj.scrollSide.left1 + obj.scrollSide.width;
        obj.upper.top1 = obj.scrollSideTop + Math.floor((obj.scrollSide.height - obj.upper.height) / 2);
        obj.upper.top2 = [];
        for (let i = 0; i < documents.length; i++) {
            obj.upper.top2.push(documents[i].isScrolled ? (obj.container.document.height[i] - obj.upper.top1 - obj.upper.height) : obj.scrollSideBottom[i] + Math.floor((obj.scrollSide.height - obj.upper.height) / 2));
        }
        // scroll texture
        obj.texture = {
            width: Math.floor(obj.upper.width * 9 / 10),
            height: Math.floor(state.scrollUpperTextureBox.height * ratio),
            backgroundPositionY1: [],
            backgroundPositionY2: []
        };
        for (let i = 0; i < documents.length; i++) {
            obj.texture.backgroundPositionY1.push(documents[i].bgY1);
            obj.texture.backgroundPositionY2.push(documents[i].isScrolled ? documents[i].bgY2 + obj.upper.top2[i] : documents[i].bgY2);
        }
        obj.texture.left = Math.floor((obj.upper.width - obj.texture.width) / 2);
        obj.texture.top = Math.floor((obj.upper.height - obj.texture.height) / 2);
        // side corpus
        obj.sideTexture = {
            width: Math.floor(ratio * state.sideBox.width),
            height: obj.texture.height
        }
        obj.sideTexture.left = obj.texture.width - obj.sideTexture.width;
    }
    // corpus
    if (true) {
        // corpus
        obj.center = {
            width: Math.floor(obj.texture.width * 9 / 10),
            height: []
        }
        for (let i = 0; i < documents.length; i++) {
            obj.center.height.push(Math.floor((obj.upper.top2[i] + (obj.upper.height) / 2) - (obj.upper.top1 + (obj.upper.height) / 2)));
        }
        obj.center.top = Math.floor(obj.upper.top1 + (obj.upper.height) / 2);
        obj.center.left = Math.floor((obj.upper.width - obj.center.width) / 2) + obj.upper.left;
        // side corpus
        obj.side = {
            width: Math.floor(ratio * state.sideBox.width),
            height: obj.center.height
        }
        obj.side.left = obj.center.width - obj.side.width;
        // corpus text
        obj.corpus = {
            width: obj.center.width - 2 * obj.side.width,
            height: []
        };
        for (let i = 0; i < documents.length; i++) {
            obj.corpus.height.push(obj.center.height[i] - obj.texture.height);
        }
    }
    // button
    if (true) {
        //button-changing
        obj.button = {
            width: scene.width - (obj.scrollSide.left2 + obj.scrollSide.width + 10),
            height: Math.floor(state.documentContainerBox.height * 5 / 8),
            top: []
        };
        obj.button.left = (obj.scrollSide.left2 + obj.scrollSide.width + 10);
        for (let i = 0; i < documents.length; i++) {
            obj.button.top.push(Math.floor((obj.container.document.height[i] - obj.button.height - state.documentSeparatorBox.height) / 2));
        }
        // image inside

        obj.image = [];
        for (let i = 0; i < documents.length; i++) {
            let temp_obj = state.imageBox.pagoda;
            let ratioimage = (3 / 4 * obj.button.width) / temp_obj.width;
            let temp = {
                width: ratioimage * temp_obj.width,
                height: ratioimage * temp_obj.height
            };
            temp.left = Math.floor((obj.button.width - temp.width) / 2);
            temp.top = Math.floor((obj.button.height - temp.height) / 2);
            obj.image.push(temp);
        }
    }
    // validation - deletion
    if(true){
        obj.valdelButton = {
            width:Math.floor(ratio * state.valdelBox.size),
            height:Math.floor(ratio * state.valdelBox.size),
            left:0,
            top1:[],
            top2:[]
        };
        for (let i = 0; i < documents.length; i++) {
            let factor = documents[i].isRated ? 1/2 : 2/3;
            obj.valdelButton.top1.push(Math.floor((obj.container.document.height[i]-state.documentSeparatorBox.height) * 1/3 - obj.valdelButton.height/2));
            obj.valdelButton.top2.push(Math.floor((obj.container.document.height[i]-state.documentSeparatorBox.height) * factor - obj.valdelButton.height/2));
        }
    }


    return obj;
}

function preparePositionPagoda(obj, documents, ratio, scene, state){
    // button
    if (true) {
        //button-changing
        obj.button2 = {
            width: obj.button.width,
            height: obj.button.height,
            top: []
        };
        for (let i = 0; i < documents.length; i++) {
            obj.button2.top.push(Math.floor((obj.container.pagoda.height[i] - obj.button2.height - state.documentSeparatorBox.height) / 2));
        }
        // image inside

        obj.image2 = [];
        for (let i = 0; i < documents.length; i++) {
            let temp_obj = state.imageBox.scroll;
            let ratioimage = (1 / 7 * obj.button2.width) / temp_obj.width;
            let temp = {
                width: ratioimage * temp_obj.width,
                height: ratioimage * temp_obj.height
            };
            temp.left = Math.floor((obj.button2.width - temp.width) / 2);
            temp.top = Math.floor((obj.button2.height - temp.height) / 2);
            obj.image2.push(temp);
        }
    }
    // background
    if(true){
        // verticalbeam
        obj.beamVertical = {
            width:Math.floor(state.beamBox.size*ratio),
            height:[],
            left1:[],
            left2:[]
        };
        for (let i = 0; i < documents.length; i++) {
            obj.beamVertical.height.push(obj.container.pagoda.height[i]);
            obj.beamVertical.left2.push(Math.floor(obj.container.pagoda.width * 11/16 - (obj.beamVertical.width)/2));
            obj.beamVertical.left1.push(Math.floor(obj.container.pagoda.width * 5/16 - (obj.beamVertical.width)/2));
        }
        // horizontalBeam
        obj.beamHorizontal = {
            width1:[],
            width2:[],
            height:Math.floor(state.beamBox.size*ratio),
            left1:[],
            left2:[],
            left3:[],
            top1:[],
            top2:[]
        };
        for (let i = 0; i < documents.length; i++) {
            obj.beamHorizontal.width1.push(obj.beamVertical.left1[i] + obj.beamVertical.width);
            obj.beamHorizontal.width2.push(obj.beamVertical.left2[i] - (obj.beamVertical.left1[i] + obj.beamVertical.width));
            obj.beamHorizontal.left1.push(0);
            obj.beamHorizontal.left2.push(obj.beamVertical.left1[i] + obj.beamVertical.width);
            obj.beamHorizontal.left3.push(obj.beamVertical.left2[i] + obj.beamVertical.width);
            obj.beamHorizontal.top1.push(Math.floor(obj.container.pagoda.width * 2/16 - (obj.beamHorizontal.height)/2));
            obj.beamHorizontal.top2.push(Math.floor((obj.container.pagoda.height[i] - obj.beamHorizontal.height)/2));
        }
    }
    // details
    if(true){
        // table
        obj.table = {
            width:Math.floor(state.tableBox.width * ratio),
            height:Math.floor(state.tableBox.height * ratio),
            top:[]
        };
        obj.table.left = Math.floor(obj.container.pagoda.width*27/32 - (obj.table.width) / 2);
        for (let i = 0; i < documents.length; i++) {
            obj.table.top.push(obj.container.pagoda.height[i] - obj.table.height - state.documentSeparatorBox.height);
        }
        // encens
        obj.encens = {
            width:Math.floor(state.encensBox.width * ratio),
            height:Math.floor(state.encensBox.height * ratio),
            top:[]
        };
        obj.encens.left = Math.floor((obj.container.pagoda.width*3/8 - obj.encens.width) / 2);
        for (let i = 0; i < documents.length; i++) {
            obj.encens.top.push(obj.container.pagoda.height[i] - obj.encens.height - state.documentSeparatorBox.height);
        }
    }
    // pagoda
    if(true){
        // pagoda floor
        obj.pagodafloor = {
            width:Math.floor(state.floorPosition.width * ratio),
            height:Math.floor(state.floorPosition.height * ratio),
            top:[]
        };
        obj.pagodafloor.left = Math.floor((obj.container.pagoda.width - obj.pagodafloor.width)/2);
        for (let i = 0; i < documents.length; i++) {
            obj.pagodafloor.top.push(obj.container.pagoda.height[i] - obj.pagodafloor.height - state.documentSeparatorBox.height);
        }
        let gap = Math.floor(ratio * 20);
        obj.pagodaDocument = [];
        for (let j = 0; j < documents.length; j++) {
            if(documents[j].data.length <= 4 && documents[j].data.length > 0){
                //pagoda
                let pagodaStep = {
                    width:[0,0,0,0],
                    height:[0,0,0,0],
                    top:[0,0,0,0],
                    left:[0,0,0,0]
                };
                let max = documents[j].data.length - 1;
                for (let i = max; i >= 0; i--) {
                    pagodaStep.width[i] = Math.floor(state.floorPosition1.width[i] * ratio);
                    pagodaStep.height[i] = Math.floor(state.floorPosition1.height[i] * ratio);
                    pagodaStep.left[i] = Math.floor((obj.container.pagoda.width-pagodaStep.width[i])/2);
                    if(i === max){
                        pagodaStep.top[i] = obj.pagodafloor.top[max - i] + gap - pagodaStep.height[i];
                    }else{
                        pagodaStep.top[i] = pagodaStep.top[i+1] - pagodaStep.height[i];
                    }
                }
                obj.pagodaDocument.push(pagodaStep);
            }
        }
    }
    return obj;
}
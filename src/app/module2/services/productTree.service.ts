import { Injectable } from '@angular/core';



export class TreeItem {
    public label: string ='';
    public id: string = '';
    public checked!: boolean;
    public parentId: string = '';
    public children: TreeItem[] =[];
}

@Injectable({
    providedIn:'root'
})
export class TreeService {
 


  findAndSetData(dataValues:TreeItem[], searchedText:any){
    for(let i=0; i<dataValues.length; i++){
      if(dataValues[i].children && dataValues[i].children.length){
        for(let j=0; j<dataValues[i].children.length; j++){
          if(dataValues[i].children[j].label.includes(searchedText)){
            dataValues.forEach(childVal=> childVal.checked = true);
           
          }
          if(dataValues[i].children[j].children && dataValues[i].children[j].children.length){
            for(let k=0; k<dataValues[i].children[j].children.length; k++){
              if(dataValues[i].children[j].children[k].label.includes(searchedText)){
                dataValues.forEach(childVal=> childVal.checked = true);
                dataValues[i].children.forEach(childVal=> childVal.checked = true);
                break;
              }
            }
          }
        }
      }
    }

    return dataValues;
  }


  generateTestData(): TreeItem[] {
    return [
        {
            label: 'Grand Parent1',
            id: '1',
            checked: false,
            parentId: '',
            children: [
                {
                    label: 'Parent 11',
                    id: '11',
                    checked: false,
                    parentId: '1',
                    children: [{
                        label: 'Child 1 1 1',
                        id: '111',
                        checked: false,
                        parentId: '11',
                    } as TreeItem,
                    {
                        label: 'Child 1 1 2',
                        id: '112',
                        checked: false,
                        parentId: '11',
                        children: [{
                        label: '1 1 2 1',
                        id: '1121',
                        checked: false,
                        parentId: '112',
                        } as TreeItem,
                        {
                        label: '1 1 2 2',
                        id: '1122',
                        checked: false,
                        parentId: '112',
                        } as TreeItem ]
                    }]
                },
                {
                label: 'Parent 1 2',
                id: '12',
                checked: false,
                parentId: '1',
                children:[
                    {
                        label: 'Child 1 2 1',
                        id: '121',
                        checked: false,
                        parentId: '12',
                    } as TreeItem,
                    {
                        label: 'Child 1 2 2',
                        id: '122',
                        checked: false,
                        parentId: '12',
                    } as TreeItem
                ]
                } as TreeItem]
        },
        {
            label: 'Grand Parent2',
            id: '2',
            checked: false,
            parentId: '',
            children:[
                {
                    label: 'Parent 2 1',
                    id: '21',
                    checked: false,
                    parentId: '2',
                    children:[
                        {
                            label: 'Child 2 1 1',
                            id: '211',
                            checked: false,
                            parentId: '21',
                        } as TreeItem
                    ]

                } as TreeItem
            ]
        } as TreeItem,
        {
            label: 'Grand Parent3',
            id: '3',
            checked: false,
            parentId: '',
            children: [
                {
                    label: 'Parent 3 1',
                    id: '31',
                    checked: false,
                    parentId: '3',
                } as TreeItem,
                {
                    label: 'Parent 3 2',
                    id: '32',
                    checked: false,
                    parentId: '3',
                    children: [
                        {
                            label: 'Child 3 2 1',
                            id: '321',
                            checked: false,
                            parentId: '32',
                        } as TreeItem,
                        {
                            label: 'Child3 2 2',
                            id: '322',
                            checked: false,
                            parentId: '32',
                        } as TreeItem
                    ]
                }
            ]
        }
    ];
  }
}

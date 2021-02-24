import { LightningElement , api} from 'lwc';
import uploadFile from '@salesforce/apex/FileUploaderClass.uploadFile';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class FileUploaderCompLWC extends LightningElement {
    @api recordId;
    fileData
    openFileUpload(event){
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = ()=>{
            console.log('!Result '+reader.result)
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name , 
                'base64' : base64 ,
                'recordId' : this.recordId
            }

            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }

    handleClick(){
        const {base64, filename , recordId} = this.fileData
        uploadFile({base64,filename,recordId}).then(result=>{
            console.log(`${result}  result Uploaded Successfully`)
            this.fileData = null
            this.dispatchEvent(
                new ShowToastEvent({
                    title : 'success',
                    variant : 'success' ,
                    message : 'file Uploaded successfully'
                })
            )
        })
    }
}
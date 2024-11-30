<script setup lang="ts">
import {reactive, ref} from "vue";
import {ArrowRightBold} from "@element-plus/icons-vue";
import {ElMessage, genFileId, rangeArr, UploadInstance, UploadProps, UploadRawFile} from "element-plus";
import {search} from "../../tools";
import {useBlastStore} from "../../pinia/Store.ts";
import {Result} from "../../network";

let data:Result = reactive({
  databases:[""],
  message: "",
  status: false,
  response:{}
})
let is_wait = ref(false)
const store = useBlastStore();
const sequence = ref('')
const drawer = ref(false)

const upload = ref<UploadInstance>()

function submitFile(rawFile: UploadRawFile){
  if (rawFile.name.endsWith(".fasta")){
    rawFile.text().then(function (text) {
      store.content = text
    })
  }else {
    ElMessage({
      message: `仅支持.fasta文件`,
      type: "warning"
    })
  }

}
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value!.handleStart(file)
}

function viewSequence(v:string){
  sequence.value = v
  drawer.value = true
}
function input(){
  store.content = ">test\nMVLTIYPDELVQIVSDKIASNKGKITLNQLWDISGKYFDLSDKKVKQFVLSCVILKKDIEVYCDGAITTKNVTDIIGDANHSYSVGITEDSLWTLLTGYTKKESTIGNSAFELLLEVAKSGEKGINTMDLAQVTGQDPRSVTGRIKKINHLLTSSQLIYKGHVVKQLKLKKFSHDGVDSNPYINIRDHLATIVEVVKRSKNGIRQIIDLKRELKFDKEKRLSKAFIAAIAWLDEKEYLKKVLVVSPKNPAIKIRCVKYVKDIPDSKGSPSFEYDSNSADEDSVSDSKAAFEDEDLVEGLDNFNATDLLQNQGLVMEEKEDAVKNEVLLNRFYPLQNQTYDIADKSGLKGISTMDVVNRITGKEFQRAFTKSSEYYLESVDKQKENTGGYRLFRIYDFEGKKKFFRLFTAQNFQKLTNAEDEISVPKGFDELGKSRTDLKTLNEDNFVALNNTVRFTTDSDGQDIFFWHGELKIPPNSKKTPNKNKRKRQVKNSTNASVAGNISNPKRIKLEQHVSTAQEPKSAEDSPSSNGGTVVKGKVVNFGGFSARSLRSLQRQRAILKVMNTIGGVAYLREQFYESVSKYMGSTTTLDKKTVRGDVDLMVESEKLGARTEPVSGRKIIFLPTVGEDAIQRYILKEKDSKKATFTDVIHDTEIYFFDQTEKNRFHRGKKSVERIRKFQNRQKNAKIKASDDAISKKSTSVNVSDGKIKRRDKKVSAGRTTVVVENTKEDKTVYHAGTKDGVQALIRAVVVTKSIKNEIMWDKITKLFPNNSLDNLKKKWTARRVRMGHSGWRAYVDKWKKMLVLAIKSEKISLRDVEELDLIKLLDIWTSFDEKEIKRPLFLYKNYEENRKKFTLVRDDTLTHSGNDLAMSSMIQREISSLKKTYTRKISASTKDLSKSQSDDYIRTVIRSILIESPSTTRNEIEALKNVGNESIDNVIMDMAKEKQIYLHGSKLECTDTLPDILENRGNYKDFGVAFQYRCKVNELLEAGNAIVINQEPSDISSWVLIDLISGELLNMDVIPMVRNVRPLTYTSRRFEIRTLTPPLIIYANSQTKLNTARKSAVKVPLGKPFSRLWVNGSGSIRPNIWKQVVTMVVNEIIFHPGITLSRLQSRCREVLSLHEISEICKWLLERQVLITTDFDGYWVNHNWYSIYEST*"
}
function check(){
  if (store.content.length != 0){
    if (is_wait.value){
      ElMessage({
        message: `请等待上一次的请求查询完毕`,
        type: "warning"
      })
      return
    }
    is_wait.value = true
    search.blast(store,data,function () {
      is_wait.value = false
    })
  }else {
    ElMessage("基因序列不符合语法规则")
  }
}
</script>

<template>
  <el-row>
    <el-col :span="10">
      <el-input
          :rows="36"
          v-model="store.content"
          resize="none"
          type="textarea"
          placeholder="请输入基因序列"
          clearable
      />
    </el-col>
    <el-col style="text-align: center;margin: auto 0" :span="4">
      <el-icon v-for="i in rangeArr(10)"><ArrowRightBold :key="i" /></el-icon>
      <br>
      <el-button id="search-button" type="primary" @click="check">搜索</el-button>
      <el-button id="search-button" type="primary" @click="input">示例</el-button>
      <el-upload
          ref="upload"
          class="upload-demo"
          :limit="1"
          :show-file-list="false"
          :on-exceed="handleExceed"
          :before-upload="submitFile"
          :auto-upload="true"
      >
        <el-button id="search-button" type="primary">上传</el-button>
      </el-upload>

    </el-col>
    <el-col :span="10">
      <el-card style="height: 100%">
        <el-table max-height="100%" v-loading="is_wait" :data="data.response['result']" style="margin: auto 0">
          <el-table-column label="Select ID" prop="origin_id">
          </el-table-column>
          <el-table-column label="FUNGA ID">
            <template #default="scope">
              <el-tag style="cursor: pointer" @click="viewSequence(scope.row.sequence)">{{ scope.row.funga_id }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="Sequence Type"></el-table-column>
          <el-table-column prop="symbol" label="Gene Symbol"></el-table-column>
          <el-table-column prop="other_name" label="Other Name"></el-table-column>
          <el-table-column prop="source" label="Source"></el-table-column>
          <el-table-column prop="similarity" label="Similarity"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
  </el-row>
  <el-drawer v-model="drawer" direction="btt">
    <template #header>
      <h4>基因序列</h4>
    </template>
    <template #default>
      <el-input
          type="textarea"
          resize="none"
          readonly
          :rows="15"
          v-model="sequence"
      />
    </template>
  </el-drawer>
</template>

<style scoped>
</style>
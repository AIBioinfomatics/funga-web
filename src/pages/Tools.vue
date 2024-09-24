<script setup lang="ts">
import {reactive, ref} from "vue";
import {ArrowRightBold} from "@element-plus/icons-vue";
import {ElMessage, rangeArr} from "element-plus";
import {search} from "../tools";
import {useBlastStore} from "../pinia/Store.ts";

let result = reactive([])
let is_wait = ref(false)
const store = useBlastStore();
const sequence = ref('')
const drawer = ref(false)
function viewSequence(v:string){
  sequence.value = v
  drawer.value = true
}
function input(){
  store.content = "MVLTIYPDELVQIVSDKIASNKGKITLNQLWDISGKYFDLSDKKVKQFVLSCVILKKDIEVYCDGAITTKNVTDIIGDANHSYSVGITEDSLWTLLTGYTKKESTIGNSAFELLLEVAKSGEKGINTMDLAQVTGQDPRSVTGRIKKINHLLTSSQLIYKGHVVKQLKLKKFSHDGVDSNPYINIRDHLATIVEVVKRSKNGIRQIIDLKRELKFDKEKRLSKAFIAAIAWLDEKEYLKKVLVVSPKNPAIKIRCVKYVKDIPDSKGSPSFEYDSNSADEDSVSDSKAAFEDEDLVEGLDNFNATDLLQNQGLVMEEKEDAVKNEVLLNRFYPLQNQTYDIADKSGLKGISTMDVVNRITGKEFQRAFTKSSEYYLESVDKQKENTGGYRLFRIYDFEGKKKFFRLFTAQNFQKLTNAEDEISVPKGFDELGKSRTDLKTLNEDNFVALNNTVRFTTDSDGQDIFFWHGELKIPPNSKKTPNKNKRKRQVKNSTNASVAGNISNPKRIKLEQHVSTAQEPKSAEDSPSSNGGTVVKGKVVNFGGFSARSLRSLQRQRAILKVMNTIGGVAYLREQFYESVSKYMGSTTTLDKKTVRGDVDLMVESEKLGARTEPVSGRKIIFLPTVGEDAIQRYILKEKDSKKATFTDVIHDTEIYFFDQTEKNRFHRGKKSVERIRKFQNRQKNAKIKASDDAISKKSTSVNVSDGKIKRRDKKVSAGRTTVVVENTKEDKTVYHAGTKDGVQALIRAVVVTKSIKNEIMWDKITKLFPNNSLDNLKKKWTARRVRMGHSGWRAYVDKWKKMLVLAIKSEKISLRDVEELDLIKLLDIWTSFDEKEIKRPLFLYKNYEENRKKFTLVRDDTLTHSGNDLAMSSMIQREISSLKKTYTRKISASTKDLSKSQSDDYIRTVIRSILIESPSTTRNEIEALKNVGNESIDNVIMDMAKEKQIYLHGSKLECTDTLPDILENRGNYKDFGVAFQYRCKVNELLEAGNAIVINQEPSDISSWVLIDLISGELLNMDVIPMVRNVRPLTYTSRRFEIRTLTPPLIIYANSQTKLNTARKSAVKVPLGKPFSRLWVNGSGSIRPNIWKQVVTMVVNEIIFHPGITLSRLQSRCREVLSLHEISEICKWLLERQVLITTDFDGYWVNHNWYSIYEST*"
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
    search.blast(store,result,function () {
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
    </el-col>
    <el-col :span="10">
      <el-card style="height: 100%">
        <el-table max-height="100%" v-loading="is_wait" :data="result" style="margin: auto 0">
          <el-table-column label="System ID">
            <template #default="scope">
              <el-tag style="cursor: pointer" @click="viewSequence(scope.row.sequence)">{{ scope.row.system_id }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="standard_id" label="Gene Name"></el-table-column>
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
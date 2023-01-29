function calculate(server) {
  var content = document.getElementById("content").value;
  var result = "";

  // 刪除要保留下來的伺服器編號
  var filterNumberList = ["04", "05", "06", "07"];
  var index = filterNumberList.indexOf(server);
  if (index !== -1) {
    filterNumberList.splice(index, 1);
  }

  for (var line of content.split("\n")) {
    var isNeedStore = true;

    console.log(line.substr(0, 2));

    // 如果每一行開頭是 __ 表示是空的王可以直接刪掉
    if (line.substr(0, 3) === " __") {
      break;
    }

    // 撈取每一行的每隻王的伺服器編號
    var serverNumber = line.substr(9, 2);

    // 根據 filterNumberList 裡面有的伺服器過濾掉
    for (var filterNumber of filterNumberList) {
      if (serverNumber === filterNumber) {
        isNeedStore = false;
        break;
      }
    }

    // 只存要保留的到 result
    if (isNeedStore) {
      result = result + line + "\n";
    }
  }

  document.getElementById("content").value = result;
  
  // 自動複製到剪貼簿
  triggerCopy();
}

function triggerCopy() {
  const element = document.getElementById("content");
  element.select();
  element.setSelectionRange(0, 99999);
  document.execCommand('copy');
  
  document.getElementById("status").innerHTML = "已自動將結果複製到剪貼簿 🎉";
}

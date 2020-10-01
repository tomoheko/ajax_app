function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/post", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      // itemは、レスポンスとして返却されたメモのレコードデータを取得している。
      const list = document.getElementById("list");
      // listは、HTMLを描画する場所を指定する際に使用する「描画する親要素」のlistの要素を取得している。
      const formText = document.getElementById("content");
      // formTextを取得する理由は、メモの入力フォームをリセットするため。この処理終了時に、入力フォームの文字は入力されたままであるため、リセットが必要。ここではリセット対象の要素であるcontentという要素を取得している。
      // ⬇︎⬇︎メモとして描画する部分のHTMLを定義(const HTML = ~ )
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);
      // listという要素に対して、insertAdjacentHTMLでHTMLを追加。第一引数にafterendを指定することで、要素listの直後に挿入できる。
      formText.value = "";
      // 「メモの入力フォームに入力されたままの文字」はリセットされる。正確には、空の文字列に上書きされるような仕組み。
    };
    e.preventDefault();
    // memo.jsの処理が重複しないように
  });
}
window.addEventListener("load", memo);
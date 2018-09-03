
$(document).ready(function(){
  $(".hidden").hide().removeClass("hidden"); //preserve class to stop flicker hack
  


  $(".add-inset").on("click", function(){
    UI.addInset();
  });
  $(".remove-inset").on("click", function(){
    UI.removeInset();
  });

  $(".slide-container").on("change","input[type=range]", function(){
    $(this).siblings(".slide-value").text( $(this).val() )
    UI.applyInsets();
  })
  $(".color-container").on("change","input[type=color]", function(){
    $(this).siblings(".color-value").text( $(this).val() )
    UI.applyInsets();
  })


  $("#background-color-container").on("change","input[type=color]", function(){
    $(this).siblings(".color-value").text( $(this).val() )
    $(".example").css( {"background-color": $(this).val()} );
  })
  $("#border-radius-slide-container").on("change","input[type=range]", function(){
    $(this).siblings(".slide-value").text( $(this).val() )
    $(".example").css( {"border-radius": `${$(this).val()}px`} );
  })

  $("#height-slide-container").on("change","input[type=range]", function(){
    $(this).siblings(".slide-value").text( $(this).val() );
    $(".example").css( {"height": $(this).val()} );
  })

  $("#width-slide-container").on("change","input[type=range]", function(){
    $(this).siblings(".slide-value").text( $(this).val() );
    $(".example").css( {"width": $(this).val()} );
  })

  for (let i = 1; i < 7; i++){
    $(`input[type='radio'][name='side-${i}']`).on("change", function() {
      UI.applyInsets();
    })
  }


});
var totalInsetsEver = 6;

class UI{
  static addInset(){
    if(border.insetsCount >= totalInsetsEver){
      UI.addWidjet(totalInsetsEver + 1);
      totalInsetsEver++;
    }
    let borderNum = border.insetsCount + 1;
    let side = $(`input[type='radio'][name=side-${borderNum}]:checked`).val();
    let blur = $(`#inset-${borderNum} input[name='blur']`).val();
    let size = $(`#inset-${borderNum} input[name='size']`).val();
    let color = $(`#inset-${borderNum} input[name='color']`).val();
    border.addInset(side, parseInt(size), parseInt(blur), color);
    UI.applyCss();
    $(`#inset-${border.insetsCount}`).show();
  }

  static removeInset(){
    if(border.insetsCount < 2){return;}
    $(`#inset-${border.insetsCount}`).hide();
    border.removeInset();
    UI.applyCss();
  }

  static applyInsets(){
    let count = border.insetsCount;
    for (let i = 0; i < count; i++){
      border.removeInset();
    }
    for (let i = 0; i < count; i++){
      UI.addInset();
    }
  }

  static applyCss(){
    $("#example-text").html(border.css);
    $(".example").css({ "box-shadow" : border.innerCss });
  }

  static addWidjet(borderNum){
    $("#inset-container").append(
`        <div id="inset-${borderNum}" class="wiget">
          <h3>Inset ${borderNum}</h3>
          <div id="radio-container">
          Side: 
            <input type="radio" name="side-${borderNum}" value="top" checked>top
            <input type="radio" name="side-${borderNum}" value="left">left
            <input type="radio" name="side-${borderNum}" value="bottom">bottom
            <input type="radio" name="side-${borderNum}" value="right">right
          </div>
          <div class="slide-container">
            Fadeout (similar to blur):  <span class="slide-value">0</span>px
            <input type="range" min="0" max="100" class="slider" name="blur" value="0">
          </div>
          <div class="slide-container">
            (visual) Size:  <span class="slide-value">1</span>px
            <input type="range" min="0" max="400" class="slider" name="size" value="1">
          </div>
          <div class="color-container">
          Color:
            <input type="color" name="color" value = "#eeeeee"> <span class="color-value">#eeeeee</span>
          </div>
        </div>
`);
    $(`input[type='radio'][name='side-${borderNum}']`).on("change", function() {
      UI.applyInsets();
    });
    $(`#inset-${borderNum} .slide-container`).on("change","input[type=range]", function(){
      $(this).siblings(".slide-value").text( $(this).val() )
      UI.applyInsets();
    });
    $(`#inset-${borderNum} .color-container`).on("change","input[type=color]", function(){
    $(this).siblings(".color-value").text( $(this).val() )
    UI.applyInsets();
  })
  }
}
var border = new Border();
UI.addInset();




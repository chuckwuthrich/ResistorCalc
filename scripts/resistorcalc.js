$(function() {
    $("div[id^='slider']").each( function(){
        $(this).slider({
            animate: true,
            orientation: "vertical",
            value: 9,
            min: 0,
            max: 10,
            slide: function(event, ui) {
                if(ui.value == 10) {
                    $(ui).slider("value", 9); //hackish workaround.
                }

                if(this.id == "slider1") {
                    $("#slider1Value").val(Math.abs(ui.value - 9));
                } else if(this.id == "slider2") {
                    $("#slider2Value").val(Math.abs(ui.value - 9));
                } else if(this.id == "slider3") {
                    $("#slider3Value").val(Math.abs(ui.value - 9));
                }

                $("#resistanceValue").text(getResistance());
            }
        });
    });

    $("#tolerance").slider({
        animate: true,
        orientation: "vertical",
        value: 2,
        min: 0,
        max: 3,
        slide: function(event, ui) {
            if(ui.value == 3) {
                $(ui).slider("value", 2); //hackish workaround.
            }

            var toleranceSliderPosition = Math.abs(ui.value - 3);

            if(toleranceSliderPosition == 1) {
                $("#toleranceValue").val(5)
            } else if (toleranceSliderPosition == 2) {
                $("#toleranceValue").val(10);
            } else if (toleranceSliderPosition == 3) {
                $("#toleranceValue").val(20);
            }

            $("#resistanceValue").text(getResistance());
        }
    });

    /*
     * formats resist1~4 to readable resistor value.
     * Thanks Lady Ada for this helpful code.
     */
    function getResistance()
    {
        resist1 = $("#slider1Value").val();
        resist2 = $("#slider2Value").val();
        resist3 = $("#slider3Value").val();
        resist4 = $("#toleranceValue").val();

        resist = parseInt(resist1 + resist2) * Math.pow(10, resist3);

        if( resist >= 1000000)
        {
            resist = resist / 1000000;
            resist = resist + 'MΩ';
        }
        else if( resist >= 1000)
        {
            resist = resist / 1000;
            resist = resist + 'KΩ';
        }
        else
        {
            resist = resist + 'Ω';
        }
        resist = resist + '+/- ' + resist4 + '%';
        return resist;
    }
});
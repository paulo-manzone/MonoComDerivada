$(document).ready(function(){

    //variáveis do problema
    var z, a, b, erro, resultado;

   //função para limpar as entradas 
    $("#limpar").click(function(){
        $("#z").val("");
        $("#a").val("");
        $("#b").val("");
        $("#erro").val("");
        $("#resultado").val("");
    });

    //função para entrar com exemplo
    $("#exemplo").click(function(){
        $("#z").val("x*x + 2*x");
        $("#a").val("-3");
        $("#b").val("5");
        $("#erro").val("0.2");
        $("#resultado").val("");
    });

    //função do botão calcular
    $("#calcular").click(function(){

        //verifica erro nas entradas
        if($("#a").val() == "" || $("#b").val() == "" || $("#z").val() == "" || $("#erro").val() == ""){
    		window.alert("Preencha corretamente os campos!");
    		return;
        }

        //preenche variáveis
        z = $("#z").val();
        a = parseFloat($("#a").val());
        b = parseFloat($("#b").val());
        erro = parseFloat($("#erro").val(), 10);

        //verificando b e a
        if(b<=a){
            window.alert("Verifique seu b e a!");
            return;
        }

        //seleciona o método
        if($("#bissecao").is(":checked")){
            resultado = bissecao(); //calcula usando bisseção 
            $("#resultado").val(resultado); //joga o resultado na tela
            return;
        }

        if($("#newton").is(":checked")){
            resultado = newton(); //calcula usando newton
            $("#resultado").val(resultado); //joga o resultado na tela
            return;
        }


    });


    //===========================================================================================
    //                                  Métodos
    //===========================================================================================
    
    //====================================
    //          Derivadas
    //===================================

    function f1x(z, pontox){
        var h, fdxmenosh, fdxmaish, x;
        h = 0.0000001;
        x = parseFloat(pontox)-h;
        fdxmenosh = eval(z);
        x = parseFloat(pontox)+h;
        fdxmaish = eval(z);
        return (fdxmaish- fdxmenosh)/(2*h);
    }

    function f2x(z, pontox){
        var h, fdxmenos2h, fdx, fdxmais2h, x;
        h = 0.0000001;
        x = parseFloat(pontox);
        fdx = eval(z);
        x = parseFloat(pontox)-2*h;
        fdxmenos2h = eval(z);
        x = parseFloat(pontox)+2*h;
        fdxmais2h = eval(z);
        return (fdxmais2h-(2*fdx) + fdxmenos2h)/(4*h*h);
    }

    //=====================================
    //          Bisseção
    //=====================================

    function bissecao(){
        var am, bm, x, derivada;
        derivada = 1;//pra entrar no while
        am = a;
        bm = b;

        //enquanto b-a>erro ou derivada != 0
        while((bm-am) > erro && Math.abs(derivada)> erro*0.001){
            x = (bm+am)/2; // encontra o meio
            derivada = f1x(z, x); //calcula a derivada nesse ponto
            if(derivada>0) bm = x; //se >0 pega parte da esquerda
            else am = x;  // senão pega a parte da direita
        }
        return x;
    }

    //=====================================
    //          Newton
    //=====================================

    function newton(){
        var xk, xkm1, fx, ffx;
        xk = a; //parte de a
        fx = f1x(z,xk); //derivada primeira
        ffx = f2x(z,xk); // derivada segunda
        xkm1 = xk - fx/ffx;
        while(Math.abs(xkm1-xk)>erro && Math.abs(fx) > erro){
            xk = xkm1;
            fx = f1x(z, xk);
            ffx = f2x(z, xk);
            xkm1 = xk - fx/ffx;
        }
        return xk;
    }

    


    //=============================================================================================
    //                          Desenvolvido por Paulo Maia
    //=============================================================================================



});
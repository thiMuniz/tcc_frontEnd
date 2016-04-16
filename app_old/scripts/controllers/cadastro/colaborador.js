'use strict';
app.controller('ColaboradorCtrl', function ($scope, $position) {
  $scope.titulo = "Cadastro Colaborador";
  $scope.headerLista = "Nenhum colaborador foi encontrado";



  $scope.colaboradors = [
    {cadastro: "000000090909", nome: "ze", email: "Cat@ Teste", telefone: "29372983729387", cep: "92839392", endereco: "rua 1"},
    {cadastro: "000000090909", nome: "severion", email: "@Cat Teste1", telefone: "29372983729387", cep: "92839392", endereco: "rua 3"},
    {cadastro: "000000090909", nome: "lula", email: "Cat Te@ste2", telefone: "29372983729387", cep: "92839392", endereco: "rua 4"},
    {cadastro: "000000090909", nome: "moro", email: "Cat Tes@te3", telefone: "29372983729387", cep: "92839392", endereco: "rua 5"},
    {cadastro: "000000090909", nome: "dilmes", email: "Cat Te@@@ste4", telefone: "29372983729387", cep: "92839392", endereco: "rua 6"},
    {cadastro: "000000090909", nome: "ta loco", email: "Cat Tes@@@te5", telefone: "29372983729387", cep: "92839392", endereco: "rua 9"}
  ];

  var cont = 5; //contador recebe o numero de resultados da query
//        if(se cont > 0){
  $scope.headerLista = cont + " Colaboradors encontrados";
//        }   


  $scope.openDialog = function (clickEvent, colab) {
    var acao = clickEvent.currentTarget.getAttribute("data-id");

    switch (acao) {
      case 'inserir':
        $scope.tituloModal = "Cadastrar Colaborador";
        $scope.colaborador = {cadastro: "", nome: "", email: "", telefone: "", cep: "", endereco: "", senha: ""};
        break;

      case 'editar':
        $scope.tituloModal = "Editar Colaborador";
        $scope.colaborador = colab;
        break;

      case 'desativar':
        swal({
          title: "Deseja mesmo desativar o Colaborador " + colab.nome + "?",
          text: "Você poderá ativar o colaborador novanente!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          cancelButtonText: "Não, me tire daqui!",
          confirmButtonText: "Sim, quero desativar!",
          closeOnConfirm: false},
                function () {
                  //metodo deleteCacolaborador - passa o colaborador por parâmetro para exclusão

                  swal({
                    title: "Colaborador desativado!",
                    type: "success"
                  });
                });
        break;

      case 'info':
        $scope.tituloModal = "Detalhes Colaborador";
        $scope.colaborador = colab;
        break;

      default:
        //mostrar alerta na tela de ação desconhecida
        break;
    }
  }


//                inicio eventos mouse
  $scope.onMouseMoveResult = "";

  var getCrossBrowserElementCoords = function (mouseEvent)
  {
    var result = {
      x: 0,
      y: 0
    };

    if (!mouseEvent)
    {
      mouseEvent = window.event;
    }

    if (mouseEvent.pageX || mouseEvent.pageY)
    {
      result.x = mouseEvent.pageX;
      result.y = mouseEvent.pageY;
    } else if (mouseEvent.clientX || mouseEvent.clientY)
    {
      result.x = mouseEvent.clientX + document.body.scrollLeft +
              document.documentElement.scrollLeft;
      result.y = mouseEvent.clientY + document.body.scrollTop +
              document.documentElement.scrollTop;
    }

    if (mouseEvent.target)
    {
      var offEl = mouseEvent.target;
      var offX = 0;
      var offY = 0;

      if (typeof (offEl.offsetParent) != "undefined")
      {
        while (offEl)
        {
          offX += offEl.offsetLeft;
          offY += offEl.offsetTop;

          offEl = offEl.offsetParent;
        }
      } else
      {
        offX = offEl.x;
        offY = offEl.y;
      }

      result.x -= offX;
      result.y -= offY;
    }

    return result;
  };

  var getMouseEventResult = function (mouseEvent, mouseEventDesc)
  {
    var coords = getCrossBrowserElementCoords(mouseEvent);
    return mouseEventDesc + " at (" + coords.x + ", " + coords.y + ")";
  };

  // Event handlers
//                $scope.updateModal = function (colab) {
  //aqui atribuir ddos ao formulario
//                $scope.colaboradorForm = {cadastro: colab.cadastro, nome: "colab.nome", email: "colab.email"};
//                $scope.reset = function() {
//                $scope.colaboradorForm = angular.copy($scope.colaboradorForm);
//                };
//                 $scope.tituloForm = "Editar colaborador"; 
//                $scope.categoria = {id:"codigo da cat x",dsCurta:"Descrição Curta (nome) da categoria x",dsDetalhada:"Detalhes da Categoria x"};
//                $scope.colaborador = colab;
//                $scope.reset();
//                };

  $scope.onSecondBtnClick = function (value) {
    $scope.onSecondBtnClickResult = "you typed '" + value + "'";
  };

  $scope.onDblClick = function () {
    $scope.onDblClickResult = "DOUBLE-CLICKED";
  };

  $scope.onMouseDown = function ($event) {
    $scope.onMouseDownResult = getMouseEventResult($event, "Mouse down");
  };

  $scope.onMouseUp = function ($event) {
    $scope.onMouseUpResult = getMouseEventResult($event, "Mouse up");
  };

  $scope.onMouseEnter = function ($event) {
    $scope.onMouseEnterResult = getMouseEventResult($event, "Mouse enter");
  };

  $scope.onMouseLeave = function ($event) {
    $scope.onMouseLeaveResult = getMouseEventResult($event, "Mouse leave");
  };

  $scope.onMouseMove = function ($event) {
    $scope.onMouseMoveResult = getMouseEventResult($event, "Mouse leave");
  };
  $scope.onMouseOverEditar = function ($event) {
    $scope.onMouseOverResult = getMouseEventResult($event, "Clique para editar cadastro");
  };
  $scope.onMouseOverExcluir = function ($event) {
    $scope.onMouseOverResult = getMouseEventResult($event, "Clique para excluir cadastro");
  };
  $scope.onMouseOverVisualizar = function ($event) {
    $scope.onMouseOverResult = getMouseEventResult($event, "Clique para visualizar cadastro");
  };
//                fim eventos mouse

});

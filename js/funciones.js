
var iTiempoTranscurrido=iPuntosObtenidos=0, iTiempoLimite=120, objPrimero;
var blnJuegoFinalizado=false;

$(document).ready(function(){
	
	var strCuadros=[1,2,3,4,5,6], iRepeticiones=4;
	
	
	$('ul li').live('click',function(){
		if(!blnJuegoFinalizado && $(this).css('opacity')!=0){
			var strImagen='imagenes/frutas/'+$(this).attr('rel')+'.png';
			if(objPrimero==undefined){
				objPrimero=$(this);
				objPrimero.stop(true,true).animate({opacity:.9}).css('background-image','url('+strImagen+')');
			}else{
				var objSegundo=$(this);
				objSegundo.stop(true,true).animate({opacity:.9}).css('background-image','url('+strImagen+')');
			
				
				if(objPrimero.index()!=objSegundo.index()){
					
					if(objPrimero.attr('rel')==objSegundo.attr('rel')){
						
						iPuntosObtenidos++;
						
						$(objPrimero).stop(true,true).animate({opacity: 1}).delay(700).animate({opacity: 0});
						$(objSegundo).stop(true,true).animate({opacity: 1}).delay(700).animate({opacity: 0});
						
				
						if(iPuntosObtenidos==$('ul li').length/2) $.fntFinalizarJuego();
					}else{
						
						$(objPrimero).stop(true,true).animate({opacity: 1},1000,function(){$(this).css('background-image','none');});
						$(objSegundo).stop(true,true).animate({opacity: 1},1000,function(){$(this).css('background-image','none');});
					}
				}else{
					
					$(this).stop(true,true).animate({opacity: 1},1000,function(){$(this).html('&nbsp;');});
				}
			
				objPrimero=undefined;
			}
		}else{
		
		}
	});
	

	$.fntTiempo=function(){
		if(!blnJuegoFinalizado){
			if(iTiempoTranscurrido>=iTiempoLimite){
				
				$.fntFinalizarJuego();
			}else{
				
				setTimeout('$.fntTiempo()',1000);
				
				$('#contador').find('p').html('<strong>Puntos obtenidos: </strong>'+iPuntosObtenidos+
				' &bull; <strong>Tiempo restante: </strong>'+(iTiempoLimite-iTiempoTranscurrido)+' segundos');
				
				iTiempoTranscurrido++;
			}
		}
	};
	
	
	$.fntFinalizarJuego=function(){
		$('#contenedor ul').html('');
	
		blnJuegoFinalizado=true;
		
		$('#contador').find('p').html('<strong>Puntos obtenidos: </strong>'+iPuntosObtenidos+
		' &bull; <strong>Tiempo empleado: </strong>'+iTiempoTranscurrido+' segundos');
		
		$('#inicio').stop(true,true).fadeIn(1500,function(){
			$('ul li').stop(true,true).css('opacity',1).html('&nbsp;');
		});
	};
	

	$.fntIniciarJuego=function(){
	
		$('#contador').find('p').html('Cargando...');
		
		
		for(var iCont=0;iCont<iRepeticiones;iCont++){
			
			strCuadros=strCuadros.sort(function(){
				return Math.random() - 0.5
			});
			
		
			for(var iCuadros=0;iCuadros<strCuadros.length;iCuadros++){
				$('#contenedor ul').append('<li rel="'+strCuadros[iCuadros]+'">&nbsp;</li>');
			}
		}
		
	
		iTiempoTranscurrido=iPuntosObtenidos=0, objPrimero=undefined;
	
		$('#inicio').stop(true,true).fadeOut(1500,function(){
		
			blnJuegoFinalizado=false;
			$.fntTiempo();
		});
	};
	

	$('#iniciar_Juego').on('click',function(){
		
		$.fntIniciarJuego();
	});
	
	
	});

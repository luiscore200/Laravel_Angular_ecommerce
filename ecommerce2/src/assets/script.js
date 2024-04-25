




function alerta() {
    console.log("Hola desde la función alerta en script.js");
  }
  
 function amount(items){
    const totalAmount = items.reduce((total, item) => {
        return total + (item.quantity * item.unit_price);
      }, 0);

      if(totalAmount<1000){ return 1000;}
    
   return totalAmount;
}

function mercadoPago(data){
    const mp = new MercadoPago('TEST-c870839d-fbf9-4150-9dfd-8627d24a95e8', {
        locale: 'es'
      });
      console.log("datos mercado pago")
      console.log(amount(data.items));
      const bricksBuilder = mp.bricks();
        const renderPaymentBrick = async (bricksBuilder) => {
          const settings = {
            initialization: {
              
              /*
                "amount" es el monto total a pagar por todos los medios de pago con excepción de la Cuenta de Mercado Pago y Cuotas sin tarjeta de crédito, las cuales tienen su valor de procesamiento determinado en el backend a través del "preferenceId"
              */
              amount:amount(data.items),
                
              preferenceId: data.id,
              payer: {
                firstName: "",
                lastName: "",
                email: "",
              },
            },
            customization: {
              visual: {
                style: {
                  theme: "default",
                },
              },
              paymentMethods: {
                atm: "all",
                                            onboarding_credits: "all",
                                            creditCard: "all",
                                            bankTransfer: "all",
                maxInstallments: 1
              },
            },
            callbacks: {
              onReady: () => {
                /*
                 Callback llamado cuando el Brick está listo.
                 Aquí puede ocultar cargamentos de su sitio, por ejemplo.
                */
              },
              onSubmit: ({ selectedPaymentMethod, formData }) => {
                console.log(JSON.stringify(formData));
                // callback llamado al hacer clic en el botón de envío de datos
    
                if(formData.payment_method_id=="pse"){
                  return new Promise((resolve, reject) => {
                  fetch("http://127.0.0.1:8000/api/checkout/pse", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  })
                    .then((response) => response.json())
                    .then((response) => {
                      // recibir el resultado del pago
                      sendResponse(response);
                  //    console.log(response);
                      
                      resolve();
                    
                 
                 
                    
                     
                    })
                    .catch((error) => {
                      // manejar la respuesta de error al intentar crear el pago
                          console.error(error);
                      reject();
                    });
                });
                }else{
                  return new Promise((resolve, reject) => {
                  fetch("http://127.0.0.1:8000/api/checkout/card", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  })
                    .then((response) => response.json())
                    .then((response) => {
                      // recibir el resultado del pago
                      console.log(response);
                      sendResponse2(response);
                      resolve();
                   

                    })
                    .catch((error) => {
                      // manejar la respuesta de error al intentar crear el pago
                      console.error(error);
                      reject();
                    });
                });
                  
                }
    
    
    
           
              },
              onError: (error) => {
                // callback llamado para todos los casos de error de Brick
                console.error(error);
              },
            },
          };
          window.paymentBrickController = await bricksBuilder.create(
            "payment",
            "paymentBrick_container",
            settings
          );
        };
        renderPaymentBrick(bricksBuilder);
}
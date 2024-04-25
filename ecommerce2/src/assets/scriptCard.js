function MPStatus(data){
  const mp = new MercadoPago('TEST-c870839d-fbf9-4150-9dfd-8627d24a95e8', { // Add your public key credential
    locale: 'es'
  });
  const bricksBuilder = mp.bricks();
  const renderStatusScreenBrick = async (bricksBuilder) => {
    const settings = {
      initialization: {
        paymentId: data, // Payment identifier, from which the status will be checked
      },
      customization: {
        visual: {
          hideStatusDetails: true,
          hideTransactionDate: true,
          style: {
            theme: 'default', // 'default' | 'dark' | 'bootstrap' | 'flat'
          }
        },
        backUrls: {
          'error': 'https://www.youtube.com/watch?v=5Per60XwWoU&list=RDMM5Per60XwWoU&start_radio=1',
          'return': 'http://localhost:4200'
        }
      },
      callbacks: {
        onReady: () => {
          // Callback called when Brick is ready
        },
        onError: (error) => {
          // Callback called for all Brick error cases
        },
      },
    };
    window.statusScreenBrickController = await bricksBuilder.create('statusScreen', 'statusScreenBrick_container', settings);
  };
  renderStatusScreenBrick(bricksBuilder);
    
}
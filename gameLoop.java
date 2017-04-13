import javafx.animation.AnimationTimer;
import javafx.scene.canvas.GraphicsContext;

/**
 * Created by firefly on 4/12/17.
 */
public class gameLoop<UpdaterType, RenderType> extends AnimationTimer{
    private long lastTime = System.nanoTime();
    private long now;
    private long timeSinceLastLoop;
    private double fractionOfSecondPassed;

    private UpdaterType updater;
    private RenderType renderer;



    @Override
    public void handle(long currentTime){
        now = System.nanoTime();
        timeSinceLastLoop = now - lastTime;
        lastTime = now;
        fractionOfSecondPassed = (double)timeSinceLastLoop/1000000000;

        //updater.update(fractionOfSecondPassed);
        //renderer.render();

        System.out.println(fractionOfSecondPassed);


        System.out.println("hello");
    }


    public void setGraphicsContext(GraphicsContext graphicsContext) {
        graphicsContext = graphicsContext;
    }
}
